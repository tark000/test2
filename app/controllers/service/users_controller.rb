class Service::UsersController < ApplicationController
  load_and_authorize_resource
  skip_authorize_resource :only =>[:show, :usersubmission, :connect, :connect_finish]

  before_filter :authenticate_user!, :except => [:usersubmission]


  def index

    if params[:search].present?
      @users = Sunspot.search(User) {
        fulltext params[:search]
      }.results
      return render json: @users
    end

    # binding.pry
    @user = User.where(:id=>params[:product_id])
    render json: @user, root: false,  each_serializer: UserSerializer

  end


  def connect_finish
    #binding.pry
    @user = User.find(current_user.id)
    @user.email = params[:email]
    @user.save
    redirect_to  "/#{@user.slug.downcase}"
  end



  def show
    @user = User.find(params[:id])


    render json: @user, serializer: UserShowSerializer
  end

  def edit
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(current_user.id)
    render json:@user
  end

  def usersubmission
    @submission = current_user
    #binding.pry
    render json: @submission , serializer: UserShowSerializer
  end

  def logout
    reset_session
    redirect_to root_path
    #render json: 'ok'
  end



end
