class CreateRoomsTypes < ActiveRecord::Migration
  def change
    create_table :rooms_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
