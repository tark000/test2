class AddDefaultStatusToAdverts < ActiveRecord::Migration
  def change
    change_column :adverts, :status, :boolean, default: true
  end
end
