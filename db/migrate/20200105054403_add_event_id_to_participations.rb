class AddEventIdToParticipations < ActiveRecord::Migration[5.1]
  def change
    add_column :participations, :event_id, :integer
  end
end
