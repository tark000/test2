class AddSignedToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :signed, :boolean, :default => true
  end
end
