class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :mail

      t.timestamps
    end
  end
end
