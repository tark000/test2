class Service::ContactPermitter < ActionController::Permitter
  permit :name, :emael, :body

end
