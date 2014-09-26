class MetroStation < ActiveRecord::Base
  attr_accessible :city_id, :name

  has_many :adverts
end
