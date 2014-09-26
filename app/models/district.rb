class District < ActiveRecord::Base
  attr_accessible :city_id, :name

  has_many :adverts
  belongs_to :city
end
