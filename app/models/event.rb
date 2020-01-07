
class Event < ActiveRecord::Base
    belongs_to :admin_user, class_name: 'User'
    has_many :participations


    def attendee_count
        participations.count
    end

    def add_participations(users)
        users.each do |user|
            Participation.create(event: self, user: user, attending: false) unless participations.pluck(:user_id).include?(user.id)
        end
    end
end
