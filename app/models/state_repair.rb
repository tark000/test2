class StateRepair < ActiveRecord::Base
  attr_accessible :name

  has_many :adverts
end