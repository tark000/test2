class Service::ContactsController < ApplicationController

  def mail

    @contact_form = params
    if @contact_form.present?
      UserMailer.new_message(@contact_form).deliver
      @contact = true
      render :json => @contact, :status => 201
    else
      @contact = false
      render :json => @contact, :status => 201
    end
  end


end
