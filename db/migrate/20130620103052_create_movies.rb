class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.integer :advert_id
      t.string :video

      t.timestamps
    end
  end
end