class AdvertImageSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id,:additionlal_image
  #has_one :advert

  def additionlal_image
    object.image
  end
end
