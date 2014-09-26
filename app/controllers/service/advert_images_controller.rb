class Service::AdvertImagesController < ApplicationController
  include ActionController::Permittance
  include RestfulJson::DefaultController

=begin
  def create
    binding.pry
  end
=end

  def update


    @advert_image = AdvertImage.find(params[:id])
    # binding.pry
    if params[:image].present?
      @advert_image.image = params[:image]
      @advert_image.save
    end

    render :json => @advert_image, :status => 201
  end
end
