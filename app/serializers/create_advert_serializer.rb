class CreateAdvertSerializer < ActiveModel::Serializer
  #self.root = false


  attributes :id, :title, :description, :user_id, :region_id, :category_id, :operation_type_id, :image, :street_id,
             :city_id, :accommodation_term_id,:all_price,:advert_images, :price,
             :business_center_class_id, :currency_user_id, :currency_user_id, :door_id, :flat_type_id,
             :floor_type_id, :house_material_id, :house_type_id, :metro_station_id, :purpouse_land_id,
             :rooms_type_id, :state_repair_id,:admin, :living, :status, :longitude, :latitude


  abilities :show, :update, :destroy

  has_many :advert_images

  has_one :category
  has_one :operation_type

  #has_one :city
  #has_one :district
  #has_one :street

  def  advert_images
    #binding.pry
    object.advert_images.map{|image| image.image}
  end




  def can_show?
    can?(:show, object)
  end

  def can_update?
    can?(:update, object)
  end

  def can_destroy?
    can?(:destroy, object)
  end



end