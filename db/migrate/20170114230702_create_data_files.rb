class CreateDataFiles < ActiveRecord::Migration[4.2]
  def change
    create_table :data_files do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
