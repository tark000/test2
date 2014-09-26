class AddSlugToBlogThemes < ActiveRecord::Migration
  def change
    add_column :blog_themes, :slug, :text
  end
end
