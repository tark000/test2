class Layout < ActiveRecord::Base
  set_table_name "layouts_old"

  attr_accessible :advert_id, :image, :remote_image_url
  mount_uploader :image, AdditionalImageUploader
  belongs_to :advert
end

