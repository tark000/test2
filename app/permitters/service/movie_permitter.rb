class Service::MoviePermitter < ActionController::Permitter
  permit :id, :advert_id, :video

end
