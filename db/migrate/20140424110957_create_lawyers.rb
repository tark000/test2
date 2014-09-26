class CreateLawyers < ActiveRecord::Migration
  def change
    create_table :lawyers do |t|
      t.text :text
      t.string :title
      t.string :image

      t.timestamps
    end
  end
end
