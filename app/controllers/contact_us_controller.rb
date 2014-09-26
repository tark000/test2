class ContactUsController < ApplicationController

  skip_before_filter :authenticate_user!




  def send_email()

    UserMailer.send_email(params).deliver
    render json: true

  end


  def send_info()
    UserMailer.send_info(params).deliver
    render json: true
  end


  def newsletter()
    site = request.protocol.to_s + request.host.to_s + ":"+ request.port.to_s
    Email.where(:signed => true).each do |m|
      UserMailer.notification(params,m.mail,site).deliver
    end


    render json: true
  end
end
