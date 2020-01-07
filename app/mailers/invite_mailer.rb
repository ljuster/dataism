class InviteMailer < ApplicationMailer
  def new_invite_email
    @participation = params[:participation]

    mail(to: @participation.user.email, subject: "commitment is a bitch")
  end
end
