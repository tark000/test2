class CitySerializer < ActiveModel::Serializer
  attributes :id, :region_id, :name
  #self.root = false
  #has_many :streets
  #has_many :districts
  #has_one :region


end
