class CreateDoors < ActiveRecord::Migration
  def change
    create_table :doors do |t|
      t.string :name

      t.timestamps
    end
  end
end
