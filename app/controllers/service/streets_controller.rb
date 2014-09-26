class Service::StreetsController < ApplicationController
  include RestfulJson::DefaultController

  def index

    params.delete('action')
    params.delete('controller')

    #binding.pry
    #@streets = Sunspot.search(Street) {
    #
    #  fulltext params[:search] if params[:search].present?
    #  with(:city_id, params[:city]) if params[:city].present?
    #
    #}.results
    @streets = Street.where(:city_id=> params[:city])


    render :json => @streets, :status => 201

  end
end
