class Service::StreetPermitter < ActionController::Permitter
  #permit :id, :image=>[]
  permit :id, :city_id,:name


end
