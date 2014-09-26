# coding: utf-8
class UserMailer < ActionMailer::Base

  default :from => 'info.officerent@gmail.com'
  default :to => 'luda352@gmail.com'

  def new_message(message)
    @contact_form = message
    mail(:subject => "[YourWebsite.tld] #{message[:name]}")
  end

  def send_email(params)

    @name = params[:name]
    #@email = params[:email]
    @phone = params[:phone]
    @data = params[:data]
    @time = params[:time]
    @url = params[:url]


    mail(to: 'vdorogun@gmail.com', :subject => "Письмо с сайта") do |format|
      format.html
      #format.text
    end

  end

  def send_info(params)

    #@name = params[:name]
    ##@email = params[:email]
    #@phone = params[:phone]
    #@data = params[:data]
    #@time = params[:time]
    #@url = params[:url]


    mail( :subject => "project") do |format|
      format.html
      #format.text
    end

  end


  def new_advert(params,url)

    @params = params
    @images = EmailImage.where(:number=>params[:rand])
    #@images = EmailImage.all.last(5)
    @url = url

    mail(to: 'vdorogun@gmail.com', :subject => "Новое обьявление") do |format|
      format.html
      #format.text
    end
  end

  def new_comment(params)

    @blog_theme = BlogTheme.find(params[:blog_theme_id]).title
    @text = params[:text]
    @user = User.find(params[:user_id]).email
    @user_id = params[:user_id]
    @comment = Comment.find(params[:comment_id])
    @url = params[:url]
    mail(to: 'elena.doroguntseva@mail.ru', :subject => "Новое коментарий") do |format|
      format.html
      #format.text
    end
  end


  def notification(params,mail,site)
    @advert = Advert.find(params[:id])
    @url = site


    mail(to: mail, :subject => "Новый обьект от Dorohouse") do |format|
      format.html
      #format.text
    end

  end

end