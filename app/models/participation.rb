# attending: true,
# amount_paid: 45.0,
# rsvped_at: "2020-01-06 05:06:46",
# invited_at
# user_id
# event_id
#
class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :event

  def rsvp
    self.touch :rsvped_at
  end
end
