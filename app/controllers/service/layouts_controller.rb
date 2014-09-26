class Service::LayoutsController < ApplicationController
  include RestfulJson::DefaultController

  def update
    #binding.pry
    @layout = Layout.find(params[:id])
    if params[:image].present?
      @layout.image = params[:image]
      @layout.save
    end

    render :json => @layout, :status => 201
  end
end
