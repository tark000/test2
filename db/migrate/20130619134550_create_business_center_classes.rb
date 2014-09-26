class CreateBusinessCenterClasses < ActiveRecord::Migration
  def change
    create_table :business_center_classes do |t|
      t.string :name

      t.timestamps
    end
  end
end
