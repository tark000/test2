class EditAdvertSerializer < ActiveModel::Serializer
  self.root = false


=begin
  attributes :id, :title,  :photo, :currentImage,
             :all_price, :latitude, :longitude,:area, :description,
             :currency_user_id, :currency_user_id,:operation, :images,
             :purpouse_land_id, :ceill_height,:life_area,:rooms, :kitchen,:wc_count,
             :room_type, :admin, :living, :latitude, :longitude,:message,:region ,:commission
=end

=begin
  attributes :id, :title, :operation_type_id, :region_id, :city_id, :street, :category_id, :house, :admin, :hotadv, :landsize, :room_type,
             :house_type_id, :house_material_id, :flat_type_id, :floor, :floors, :area, :floor_type_id, :state_repair_id, :currentImage,
             :price, :description, :living
=end

  #attributes :id, :title, :operation_type_id, :region_id, :city_id, :street, :category_id, :house,
  #           :admin, :hotadv, :landsize, :room_type,
  #           :house_type_id, :house_material_id, :flat_type_id, :floor, :floors, :area,
  #           :floor_type_id, :state_repair_id,
  #           :price, :description, :living, :all_price, :street_id, :rooms, :photo, :layout,
  #           :video, :trassa_diraction_id, :purpouse_land_id, :life_area, :kitchen,:wc_count, :ceill_height,
  #           :metro_station_id, :door_id,
  #           :accommodation_term_id, :preporty_location_id, :business_center_class_id, :cabinetcount,
  #           :user_id, :slug, :torg, :free_from, :free_to, :commission



  attributes :id, :category_id, :city_id, :district_id, :street_id, :house, :house_material_id,
             :house_type_id, :rooms, :rooms_type_id,:rooms_type_id, :floor, :floors, :trassa_diraction_id,
             :purpouse_land_id, :landsize, :title, :description, :area, :life_area, :kitchen,
             :home_deadline, :free_from, :floor_type_id, :wc_count, :state_repair_id, :ceill_height,
             :distance, :hotadv, :price, :all_price, :usercost, :usercostforall,
             :currency_user_id, :viewcount, :metro_station_id, :door_id,
             :accommodation_term_id,  :preporty_location_id, :business_center_class_id,
             :separate_entrence_id, :cabinetcount,  :layout,
             :user_id, :slug, :torg, :free_to, :operation_type_id, :commission, :flat_type_id, :video,
             :admin, :region_id, :mapaddress, :youtube,
             :address, :longitude, :latitude, :living, :photo, :room_type, :images, :layouts, :movies, :status


  abilities :show, :update, :destroy

 # has_many :advert_images
=begin
  has_many :layouts_old

  has_one :category
  has_one :operation_type

  has_one :city
  has_one :house_type
  has_one :flat_type
  has_one :district

  has_one :state_repair
=end
  has_one :street

  def currentImage
    object.photo.big.url
  end


=begin
  def state_repair_id
    object.state_repair_id
  end
=end


  def currentImage
    object.photo.big.url
  end




=begin
  def street
    object.street_id
  end
=end

  def  images
    #binding.pry
   object.advert_images
  end


  def  layouts
    #binding.pry
    object.layouts
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

  def movies
    object.movies
  end




end

