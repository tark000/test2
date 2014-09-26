class Service::CommentsController < ApplicationController
  include RestfulJson::DefaultController


  def index
       
    @comments = BlogTheme.find(params["id"]).comments.where(:checked => true)


    render :json => @comments, :status => 201,  each_serializer: CommentSerializer

  end

  def create

    if !current_user.name.present? || !current_user.phone.present?
      user = current_user
      user.name = params[:comment][:name]
      user.phone = params[:comment][:phone]
      user.save
    end

    @comment = Comment.create(:text=>params[:comment][:text],:blog_theme_id=>params[:comment][:blog_theme_id], :user_id=>current_user.id)
    @url = request.protocol + request.host_with_port + rails_admin.edit_path(model_name: 'Comment', id: @comment.id)
    UserMailer.new_comment(:text=>params[:comment][:text],:blog_theme_id=>params[:comment][:blog_theme_id], :user_id=>current_user.id, :comment_id => @comment.id, :url => @url).deliver
    render json: @comment
  end

  def destroy
    comment = Comment.find(params[:id])

    if comment.user == current_user
      comment.delete
      render json: "destroy"
    else
      render json: "no destroy"
    end

  end



end
