class CreateParticipations < ActiveRecord::Migration[5.1]
  def change
    create_table :participation do |t|
      t.boolean :attending, default: false
      t.datetime :rsvped_at
    end
  end
end
