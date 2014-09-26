class CreateBlogThemes < ActiveRecord::Migration
  def change
    create_table :blog_themes do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
