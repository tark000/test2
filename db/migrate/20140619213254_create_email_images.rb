class CreateEmailImages < ActiveRecord::Migration
  def change
    create_table :email_images do |t|
      t.string :image
      t.integer :number

      t.timestamps
    end
  end
end
