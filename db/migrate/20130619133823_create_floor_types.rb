class CreateFloorTypes < ActiveRecord::Migration
  def change
    create_table :floor_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
