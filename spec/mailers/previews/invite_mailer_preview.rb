# Preview all emails at http://localhost:3000/rails/mailers/invite_mailer
class InviteMailerPreview < ActionMailer::Preview
  def new_invite_email
    # Set up a temporary order for the preview
    event = Event.new(name: "Fake event", starts_at: Time.zone.now, special_instructions: "asdfsdaf")
    participation = Participation.new(event: event, user: User.first, attending: false)

    InviteMailer.with(participation: participation).new_invite_email
  end
end
