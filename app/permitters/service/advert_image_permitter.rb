class Service::AdvertImagePermitter < ActionController::Permitter
  #permit :id, :image=>[]
  permit :id, :image, :advert_id


end
