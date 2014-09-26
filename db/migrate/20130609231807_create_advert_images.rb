class CreateAdvertImages < ActiveRecord::Migration
  def change
    create_table :advert_images do |t|
      t.string :image
      t.string :advert_id

      t.timestamps
    end
  end
end
