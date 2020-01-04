
class Event < ActiveRecord::Base
    belongs_to :admin_user, class_name: 'User'
    has_many :participations

end
