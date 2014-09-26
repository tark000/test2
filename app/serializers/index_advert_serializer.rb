class IndexAdvertSerializer < ActiveModel::Serializer
  #self.root = false


  attributes :id, :title,  :category, :operation_type_id, :photo,
             :city_id, :all_price, :latitude, :longitude,:area, :price, :city, :operation, :slug, :main_photo, :living, :operation_type_id
            # :business_center_class_id, :currency_user_id, :currency_user_id, :door_id, :flat_type_id,
            # :floor_type_id, :house_material_id, :house_type_id, :metro_station_id, :purpouse_land_id,
            # :rooms_type_id, :state_repair_id,:admin, :living, :latitude, :longitude,:message


  abilities :show, :update, :destroy

  #has_many :advert_images
  #
  #has_one :category
  #has_one :operation_type

  #has_one :city
  #has_one :district
  #has_one :street

=begin
  def  advert_images
    #binding.pry
   object.advert_images.map{|image| image.image}
  end
=end

  def category
    object.category.name if object.category.present?
  end

  def operation
    object.operation_type.name if object.operation_type.present?
  end

  def city
    object.city.name if object.city.present?
  end

  def main_photo
    unless object.photo.medium.url.nil?
      return object.photo.medium.url
    else
      #return object.advert_images[0].image.medium.url
      return ''
    end
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


  def price
    object.price.to_i
  end

  def slug
    object.slug.present?  ? object.slug : object.id
  end


end

