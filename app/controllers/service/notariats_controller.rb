class Service::NotariatsController < ApplicationController

  def index
    @notariat = Notariat.last
    render :json => @notariat, :status => 201
  end

end
