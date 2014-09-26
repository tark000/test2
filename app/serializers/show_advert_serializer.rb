# coding: utf-8
class ShowAdvertSerializer < ActiveModel::Serializer
  self.root = false



  attributes :id, :title,  :photo, :currentImage,
             :all_price, :latitude, :longitude,:area, :description,
             :currency_user_id, :currency_user_id, :images,
             :purpouse_land_id, :ceill_height,:life_area,:rooms, :kitchen,:wc_count,
             :room_type, :admin, :living, :latitude, :longitude,:message,:region ,:commission,
             :price, :city, :operation, :slug, :category, :created_at, :metro, :video, :youtube,
             :smallSlider, :sliderImage, :sliderFull, :advertImages, :images, :movies, :pdf,
             :layoutSmallSlider, :layoutSliderImage, :layoutSliderFull, :layouts, :viewcount, :status, :mediumImage, :street_id



  abilities :show, :update, :destroy


 # has_many :advert_images
  #has_many :layouts_old

  #has_one :house_type
  has_one :flat_type
  has_one :district
  has_one :street
  has_one :state_repair

  def currentImage
    object.photo.url
  end

  def category

    object.category.name if object.category.present?
  end

  def operation
    object.operation_type.name if object.operation_type.present?
  end

  def city
    object.city.name if object.city.present?
  end

  def region
    if object.city.present?
      object.city.region.name if object.city.region.present?
    end

  end

  def metro
    object.metro_station.name if object.metro_station.present?
  end


  def created_at
    object.created_at.strftime("%d-%m-%Yг.")
  end



=begin
  def city
    object.city_id
  end
=end

  def  images
    #binding.pry
   object.advert_images.map{|image| image.image}
  end


  def  layouts
    #binding.pry

    object.layouts.map{|image| image.image}
  end
=begin
  def category
    object.category.name
  end
=end


  def can_show?
    can?(:read, object)
  end

  def can_update?
    can?(:update, object)
  end

  def can_destroy?
    can?(:destroy, object)
  end


  def smallSlider
    object.photo.small_slider.url
  end

  def sliderImage

      unless object.photo.slider_fit.url.nil?
        return object.photo.slider_fit.url
      else
        if object.advert_images[0].present?
          return object.advert_images[0].image.slider_fit.url
        end

      end
  end

  def sliderFull
    object.photo.url
  end


  def layoutSmallSlider
    object.layout.small_slider.url
  end

  def layoutSliderImage
    object.layout.slider_fit.url
    
  end

  def layoutSliderFull
    object.layout.url
  end

  def  images
    #binding.pry
    object.advert_images.map{|image| image.image}
  end

  def advertImages
    #binding.pry
    object.advert_images
  end


  def mediumImage

    object.photo.medium.url
  end

  def movies
    object.movies
    #object.movies.map {|v| '<iframe class = "youtube" width="640" height="480" src="' + "//www." + v.video.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/).to_s + '" frameborder="0" allowfullscreen></iframe>' } if object.movies.size > 0
  end

  #def video
  #  '<iframe class = "youtube" width="640" height="480" src="' + "//www." + object.video.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/).to_s + '" frameborder="0" allowfullscreen></iframe>' if object.video.present?
  #
  #end

  def status



    if object.status
      "Свободно"
    else
      "Занято"
    end
  end

end

