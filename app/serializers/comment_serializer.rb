class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :user_id, :blog_theme_id, :user, :created_at

  abilities :create, :read, :update, :destroy

  def user
    object.user.email
  end
end
