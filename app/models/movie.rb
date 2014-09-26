class Movie < ActiveRecord::Base
  attr_accessible :advert_id, :video
  belongs_to :advert
end