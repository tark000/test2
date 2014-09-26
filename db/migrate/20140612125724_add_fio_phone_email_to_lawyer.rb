class AddFioPhoneEmailToLawyer < ActiveRecord::Migration
  def change
    rename_column :lawyers, :title, :name
    add_column :lawyers, :phone, :string
    add_column :lawyers, :email, :string
  end
end
