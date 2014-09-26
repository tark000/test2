class CreatePurpouseLands < ActiveRecord::Migration
  def change
    create_table :purpouse_lands do |t|
      t.string :name

      t.timestamps
    end
  end
end
