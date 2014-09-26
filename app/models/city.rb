class City < ActiveRecord::Base
  attr_accessible :region_id, :name
  has_many :adverts
  has_many :streets
  has_many :districts
  belongs_to :region
end
