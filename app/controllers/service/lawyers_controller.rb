class Service::LawyersController < ApplicationController
  include RestfulJson::DefaultController
  def index
    @Lawyer = Lawyer.all
    render :json => @Lawyer, :status => 201
  end


end
