class BusinessCenterClass < ActiveRecord::Base
  attr_accessible :name

  has_many :adverts
end
