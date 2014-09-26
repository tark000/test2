class Service::RegionsController < ApplicationController
  include RestfulJson::DefaultController


  before_filter :authenticate_user!, :except => [:create, :search, :index, :show]
  def search
    @regions = Region.all.map {|r| r if r.adverts.present?} - [nil]

    render :json => @regions, :status => 201,  each_serializer: RegionSearchSerializer
  end


end
