class Management < ActiveRecord::Base
  attr_accessible :image, :text, :title, :image_cache, :remove_image

  mount_uploader :image, NavUploader


end
