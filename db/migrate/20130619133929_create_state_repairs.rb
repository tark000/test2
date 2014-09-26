class CreateStateRepairs < ActiveRecord::Migration
  def change
    create_table :state_repairs do |t|
      t.string :name

      t.timestamps
    end
  end
end
