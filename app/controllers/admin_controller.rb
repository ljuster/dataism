class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin

  def index
    @users = User.all
  end

  def send_friday_reminder
    #event = Event.where('starts_at > ? AND starts_at < ?', Time.zone.now, Time.zone.now + 5.days)
    event = Event.find(1)
    part = Participation.where(user_id: 1).first
    InviteMailer.with(participation: part).new_invite_email.deliver_later
      #event.participations.each do |p|
    #  InviteMailer.with(participation: p).new_invite_email.deliver_later(event.starts_at - 2.days)
    #end
    redirect_to admin_index_url, notice: "email sent"
  end

  def authenticate_admin
    ["leorajuster@gmail.com", "mckenziect@gmail.com"].include?(current_user[:email])
  end
end
