class Service::CitiesController < ApplicationController
  include ActionController::StrongParameters
  include RestfulJson::DefaultController

  def index
    params.delete('action')
    params.delete('controller')

    if params[:region_id].present?
      @cities = City.find_all_by_region_id(params[:region_id])
    else
      @cities = City.all
    end
    render :json => @cities, :status => 201
  end
end
