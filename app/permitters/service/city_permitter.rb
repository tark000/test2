class Service::CityPermitter < ActionController::Permitter
  #permit :id, :image=>[]
  permit :id, :region_id,:name


end
