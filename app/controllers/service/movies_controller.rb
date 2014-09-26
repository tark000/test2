class Service::MoviesController < ApplicationController
  include RestfulJson::DefaultController
=begin
  def create



    render :json => @movie, :status => 201
  end
=end



  def show
    @movie = Movie.find(params[:id])
    render :json => @movie
  end


  #def delete
  #  binding.pry
  #  @movie = Movie.find(params[:id])
  #  @movie.delete
  #  render :json => "delete"
  #end

end


