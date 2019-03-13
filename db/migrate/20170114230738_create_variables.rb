class CreateVariables < ActiveRecord::Migration[4.2]
  def change
    create_table :variables do |t|
      t.string :name
      t.string :type
      t.references :data_file, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
