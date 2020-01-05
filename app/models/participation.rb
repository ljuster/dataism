class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :event


  def rsvp
    self.touch :rsvped_at
  end

end
