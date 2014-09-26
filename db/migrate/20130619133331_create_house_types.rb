class CreateHouseTypes < ActiveRecord::Migration
  def change
    create_table :house_types do |t|
      t.string :name
      t.integer :category_id

      t.timestamps
    end
  end
end
