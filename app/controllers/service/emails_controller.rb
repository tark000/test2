class Service::EmailsController < ApplicationController
  include RestfulJson::DefaultController
  before_filter :authenticate_user!, :except => [:create]
  def create
    @mail = Email.create(:mail => params[:email][:mail])

    render :json => @mail
  end

end
