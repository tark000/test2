class Service::DistrictsController < ApplicationController
  include RestfulJson::DefaultController

  def index
    params.delete('action')
    params.delete('controller')

    if params[:city_id].present?
      @districts = District.find_all_by_city_id(params[:city_id])
    else
      @districts = City.all
    end
    render :json => @districts, :status => 201
  end
end
