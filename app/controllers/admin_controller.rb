class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin

  def index
    @users = User.all
  end

  def send_friday_reminder
    event = Event.where('starts_at > ? AND starts_at < ?', Time.zone.now, Time.zone.now + 5.days)
    event.participations.each do |p|
      InviteMailer.with(participation: p).new_invite_email.deliver_later(event.starts_at - 2.days)
    end
  end

  def authenticate_admin
    ["leorajuster@gmail.com", "mckenziect@gmail.com"].include?(current_user[:email])
  end
end
