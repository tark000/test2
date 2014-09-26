class CreateNotariats < ActiveRecord::Migration
  def change
    create_table :notariats do |t|
      t.text :text
      t.string :image
      t.string :title

      t.timestamps
    end
  end
end
