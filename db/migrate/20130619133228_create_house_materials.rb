class CreateHouseMaterials < ActiveRecord::Migration
  def change
    create_table :house_materials do |t|
      t.string :name

      t.timestamps
    end
  end
end
