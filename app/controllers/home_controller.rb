class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index, :sitemap]

  def index
    respond_to do |format|
      format.html # index.html.haml.erb
    end
  end



  def sitemap
    @adverts = Advert.all
    respond_to do |format|
      format.xml
    end
  end
end
