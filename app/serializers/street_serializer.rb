class StreetSerializer < ActiveModel::Serializer
  attributes :id, :city_id, :name, :district_id

  #has_one :city
  #has_one :district

end
