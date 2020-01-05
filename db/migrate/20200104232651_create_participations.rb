class CreateParticipations < ActiveRecord::Migration[5.1]
  def change
    create_table :participations do |t|
      t.boolean :attending
      t.float :amount_paid
      t.datetime :rsvped_at
      t.datetime :invited_at

      t.timestamps
    end
  end
end
