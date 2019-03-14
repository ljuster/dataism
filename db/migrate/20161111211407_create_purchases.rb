class CreatePurchases < ActiveRecord::Migration[4.2]
  def change
    create_table :purchases do |t|
      t.string :name
      t.string :email
      t.string :description
      t.string :image
      t.datetime :purchase_date

      t.timestamps null: false
    end
  end
end
