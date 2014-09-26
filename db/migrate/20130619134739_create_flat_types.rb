class CreateFlatTypes < ActiveRecord::Migration
  def change
    create_table :flat_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
