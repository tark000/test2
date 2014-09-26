class CreateCurrencyUsers < ActiveRecord::Migration
  def change
    create_table :currency_users do |t|
      t.string :name

      t.timestamps
    end
  end
end
