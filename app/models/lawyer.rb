class Lawyer < ActiveRecord::Base
  attr_accessible :text, :phone, :name, :email, :image,  :image_cache, :remove_image

  mount_uploader :image, LawyerImageUploader

  rails_admin do
    edit do
      field :name
      field :phone
      field :email
      field :text
      field :image

    end
  end
end
