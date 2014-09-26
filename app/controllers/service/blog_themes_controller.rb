class Service::BlogThemesController < ApplicationController
  include RestfulJson::DefaultController


  def index
    @blogs = BlogTheme.all


    render :json => @blogs, :status => 201,  each_serializer: BlogThemeSerializer

  end


  def show
    @blog_theme = BlogTheme.find(params[:id])
    render :json => @blog_theme, :status => 201,  serializer: BlogThemeSerializer
  end

end
