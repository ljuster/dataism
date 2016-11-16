class CreateAlgorithms < ActiveRecord::Migration
  def change
    create_table :algorithms do |t|
      t.string :name
      t.string :input
      t.integer :runtime

      t.timestamps null: false
    end
  end
end
