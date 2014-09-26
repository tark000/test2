class HouseType < ActiveRecord::Base
  attr_accessible :name, :category_id

  has_many :adverts
end
