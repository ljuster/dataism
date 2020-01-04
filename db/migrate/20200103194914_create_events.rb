class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.text :special_instructions
      t.datetime :starts_at
      t.datetime :invite_at

      t.timestamps
    end
  end
end
