class AdvertImage < ActiveRecord::Base
  attr_accessible :advert_id, :image, :remote_image_url
  mount_uploader :image, AdditionalImageUploader
  belongs_to :advert
end