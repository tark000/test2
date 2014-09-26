class AddPdfToAdverts < ActiveRecord::Migration
  def change
    add_column :adverts, :pdf, :text
  end
end
