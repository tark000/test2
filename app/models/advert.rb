# coding: utf-8

require "babosa"
class Advert < ActiveRecord::Base
  attr_accessible :id, :category_id, :city_id, :district_id, :street_id, :house, :house_material_id,
                  :house_type_id, :rooms, :rooms_type_id,:rooms_type_id, :floor, :floors, :trassa_diraction_id,
                  :purpouse_land_id, :landsize, :title, :description, :area, :life_area, :kitchen,
                  :home_deadline, :free_from, :floor_type_id, :wc_count, :state_repair_id, :ceill_height,
                  :distance, :hotadv, :price, :all_price, :usercost, :usercostforall,
                  :currency_user_id, :viewcount, :metro_station_id, :door_id,
                  :accommodation_term_id,  :preporty_location_id, :business_center_class_id,
                  :separate_entrence_id, :cabinetcount, :bussines_period_id, :layout, :image,
                  :user_id, :slug, :torg, :free_to, :operation_type_id, :commission, :flat_type_id, :video,
                  :admin, :region_id, :mapaddress, :youtube, :remote_image_url, :remote_layout_url,
                  :advert_images_attributes, :layouts_attributes, :movies_attributes,
                  :address, :longitude, :latitude, :living, :photo, :room_type, :pdf, :status

  mount_uploader :photo, ImageUploader
  mount_uploader :layout, ImageUploader

  belongs_to :category
  belongs_to :operation_type
  belongs_to :city
  belongs_to :street
  belongs_to :house_type
  belongs_to :flat_type
  belongs_to :state_repair
  belongs_to :district
  belongs_to :metro_station
  belongs_to :floor_type
  belongs_to :purpouse_land
  belongs_to :door
  belongs_to :business_center_class
  belongs_to :region
  belongs_to :rooms_type
  belongs_to :currency_user

  has_many :layouts
  has_many :movies
  has_many :advert_images, :dependent => :destroy
  accepts_nested_attributes_for :advert_images, allow_destroy: true

  scope :search, lambda{ |b = nil| where('id = ?', "#{b}") if b.present? }



  scope :commission_search, (lambda do |b|

    if b.to_i == 1

      where('commission = ?', 0)

    elsif b.to_i == 0
      where('commission > ?', 0)
    end
  end)


  #scope :operation_type_search , lambda{|b| where(:operation_type_id => b)}
  scope :operation_type_search, (lambda do |b|
    if b.to_i == 1
      where('operation_type_id = ?', 1)

    elsif b.to_i == 0
      where('operation_type_id > ?', 1)
    end
  end)
  scope :category_search, lambda{ |b| where(:category_id => b)}
  scope :living_search , lambda{|b=nil| where(b.nil? ? ''  :living => b)}
  scope :state_search, lambda{|b| where(:state => b)}
  scope :all_min_price_search, lambda{|b| where('all_price >= ?', b)}
  scope :all_max_price_search, lambda{|b| where('all_price <= ?', b)}
  scope :min_price_search, lambda{|b| where('price >= ?', b)}
  scope :max_price_search, lambda{|b| where('price <= ?', b)}
  scope :min_area_search, lambda{|b| where('area >= ?', b)}
  scope :max_area_search, lambda{|b| where('area <= ?', b)}
  scope :regoin_search, lambda{|b| where(:region_id => b)}
  scope :city_search, lambda{|b| where(:city_id => b)}

  scope :with_map, where('(latitude !="") and (longitude !="") ')
  scope :search_by_type,lambda{|b| where(:category_id => b)}
  scope :marking_search, lambda{|b| where('id = ?', b)}
  scope :metro_search, lambda{|b| where(:metro_station_id => b)}
  scope :free_search, lambda{|b| where('status = ?', b)}
  scope :sale_search, where(:updated_at => 7.days.ago..Time.now)
  attr_accessor   :address

  geocoded_by :address
  after_validation :geocode
  #after_validation :create_map
  # after_validation :create_pdf
  extend FriendlyId




  friendly_id :title, use: :slugged
  belongs_to :category
  belongs_to :operation_type
  belongs_to :city
  belongs_to :street


  searchable do
    text :description, :boost =>5
    text :category do
      category.name if category
    end
    text :operation_type do
      operation_type.name if operation_type
    end
    text :city do
      city.name if city
    end

    text :street do
      street.name if street
    end


    integer :price

  end


  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :russian).to_s
  end


  def address
    #binding.pry
    if self.street.present? & self.city.present?
      [self.house, self.street.name, self.city.name, 'UA'].compact.join(', ')
      #if self.house_changed? || self.street_id_changed? || self.city_id_changed?
      #  map_download
      #end
    else
      puts self.id
    end
  end

  def create_map
    if self.street.present? & self.city.present?
      map_download
    end
  end

  def map_download
    require 'open-uri'
    map = "#{uuid}.png"
    FileUtils.mkdir_p(store_dir('map')) unless File.exists?(store_dir('map'))
    @path = "#{store_dir('map')}/"
    open(@path, 'wb') do |file|
      file << open(static_map).read
    end
    self.mapaddress = @path

  end

  def uuid
    UUID.state_file = false
    uuid = UUID.new
    uuid.generate

  end

  def static_map
    params = {
        :center => [self.latitude, self.longitude].join(","),
        :zoom => 12,
        :size => "300x300",
        :markers => [self.latitude, self.longitude].join(","),
        :sensor => false
    }
    query_string =  params.map{|k,v| "#{k}=#{v}"}.join("&")
    @c = "http://maps.googleapis.com/maps/api/staticmap?#{query_string}"
    @c
  end

=begin
  def store_dir
    "public/uploads/#{self.class.to_s.underscore}/map/#{self.id}"
  end
=end


=begin
  def self.create_map(advert)
    if advert.street.present? & advert.city.present?
      map_download(advert)
    end
  end

  def self.map_download(advert)
    require 'open-uri'
    map = "#{uuid}.png"
    FileUtils.mkdir_p(store_dir(advert)) unless File.exists?(store_dir(advert))
    @path = "#{store_dir(advert)}/#{map}"
    open(@path, 'wb') do |file|
      file << open(static_map(advert)).read
    end
    @path

  end

  def self.uuid
    UUID.state_file = false
    uuid = UUID.new
    uuid.generate

  end

  def self.static_map(advert)
    params = {
        :center => [advert.latitude, advert.longitude].join(","),
        :zoom => 12,
        :size => "300x300",
        :markers => [advert.latitude, advert.longitude].join(","),
        :sensor => false
    }
    query_string =  params.map{|k,v| "#{k}=#{v}"}.join("&")
    @c = "http://maps.googleapis.com/maps/api/staticmap?#{query_string}"
    @c
  end

  def self.store_dir(advert)
    "public/uploads/#{advert.class.to_s.underscore}/map/#{advert.id}"
  end
=end


  def store_dir(field)
    "public/uploads/#{field}/#{self.id}"
  end

  #def create_pdf
  #  FileUtils.mkdir_p("#{Rails.root.to_s}/#{store_dir('pdf')}")
  #  pdf = AdvertPdf.new(self)
  #  File.new("public/uploads/#{self.class.to_s.underscore}/pdf/#{self.id}.pdf", "w")
  #  pdf.render_file File.join("public/uploads/#{self.class.to_s.underscore}/pdf/#{self.id}.pdf")
  #end





  def create_pdf

    FileUtils.mkdir_p("#{Rails.root.to_s}/#{store_dir('pdf')}")

    ac = ActionController::Base.new()
    #ac.render_to_string(:partial => '/path/to/your/template', :locals => {:varable => somevarable})
    @advert = self

    html = ac.render_to_string :template  => "/pdf/pdf_template.html.haml", :encoding => "UTF-8", :locals => {:advert => @advert}
    kit = PDFKit.new(html, :page_size => 'Letter')

    #робоча
    kit.stylesheets << "app/assets/stylesheets/pdfkit.css"
    #для імпорту
    #kit.stylesheets << "../app/assets/stylesheets/pdfkit.css"


    # Save the PDF to a file
    #робоча
    file = kit.to_file("public/uploads/pdf/#{self.id}/#{self.id}.pdf")
    #для імпорту
    #file = kit.to_file("../public/uploads/#{self.class.to_s.underscore}/pdf/#{self.id}/#{self.id}.pdf")



    self.pdf = "/uploads/pdf/#{self.id}/#{self.id}.pdf"
    puts "pdf created"

  end






end

