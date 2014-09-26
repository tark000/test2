class AddDefaultToCommisionAdverts < ActiveRecord::Migration
  def change
    change_column :adverts, :commission, :float, default: 0
  end
end
