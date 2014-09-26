class CreateManagements < ActiveRecord::Migration
  def change
    create_table :managements do |t|
      t.text :text
      t.string :title
      t.string :image

      t.timestamps
    end
  end
end
