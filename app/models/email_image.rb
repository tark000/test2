class EmailImage < ActiveRecord::Base
  attr_accessible :image, :number, :image_cache, :remove_image
  mount_uploader :image, EmailImageUploader
end
