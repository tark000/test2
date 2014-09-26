class Service::ManagementsController < ApplicationController
  before_filter :authenticate_user!, :except => [:save_images,  :new_adverts, :index]
  def index
    @management = Management.last
    render :json => @management, :status => 201
  end

  def new_adverts
    url =  request.protocol + request.host_with_port
    UserMailer.new_advert(params,url).deliver
    render json: true
  end

  def save_images

    EmailImage.create(:image=> params[:myFile],:number => params[:rand])


    render json: true
  end

end
