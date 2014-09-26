class Region < ActiveRecord::Base
  attr_accessible :name
  has_many :adverts
  has_many :cities
end
