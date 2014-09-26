class BlogThemeSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id, :description, :title, :slug



  #def comments
  #  @array = []
  #  object.comments.each do |c|
  #    @array << {:text => c.text, :created_at => c.created_at, :user => c.user.email}
  #  end
  #  @array
  #end
end
