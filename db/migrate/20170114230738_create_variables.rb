class CreateVariables < ActiveRecord::Migration
  def change
    drop_table :variables
    create_table :variables do |t|
      t.string :name
      t.string :type
      t.references :data_file, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
