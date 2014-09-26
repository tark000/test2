class AddStatusToAdverts < ActiveRecord::Migration
  def change
    add_column :adverts, :status, :boolean
  end
end
