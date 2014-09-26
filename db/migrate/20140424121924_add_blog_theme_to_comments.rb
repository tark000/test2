class AddBlogThemeToComments < ActiveRecord::Migration
  def change
    add_column :comments, :blog_theme_id, :integer
  end
end
