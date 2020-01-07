class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :participations

  def total_paid
    return participations.map(&:amount_paid).sum + self.amount_paid if participations.map(&:amount_paid).sum
    amount_paid
  end

  def authenticate_admin
    ["leorajuster@gmail.com", "mckenziect@gmail.com"].include?(email)
  end
end
