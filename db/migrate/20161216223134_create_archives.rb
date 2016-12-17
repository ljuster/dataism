class CreateArchives < ActiveRecord::Migration
  def change
    create_table :archives do |t|
      t.string :name
      t.integer :count
      t.datetime :before
      t.datetime :after

      t.timestamps null: false
    end
  end
end
