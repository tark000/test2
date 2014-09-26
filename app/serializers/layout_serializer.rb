class LayoutSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id,:additionlal_layout
  #has_one :advert

  def additionlal_layout
    object.image
  end

end
