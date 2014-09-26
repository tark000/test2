class Comment < ActiveRecord::Base
  resourcify

  attr_accessible :text, :user_id, :blog_theme_id, :checked

  belongs_to :blog_theme
  belongs_to :user

  before_save :change_user

  def title
    self.text
  end

  #RailsAdmin.config do |config|
  #  config.model 'Comment' do

  #
  #    field :text
  #    field :blog_theme, :belongs_to_association
  #    field :checked
  #
  #
  #  end
  #end

  def change_user
    if self.id.present?
      self.user_id = Comment.find(self.id).user_id
    end

  end



end
