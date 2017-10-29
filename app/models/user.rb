class User < ApplicationRecord
  has_secure_password
  before_create :generate_confirmation_hash
  attr :password_confirmation
  has_many :sessions, dependent: :destroy
  has_many :trips, dependent: :destroy
  validates :password, confirmation: true, presence: true, if: :should_validate_password?
  validates :password_confirmation, presence: true, if: :should_validate_password?
  validates :name, presence: true
  validates :email, email_format: { message: 'Doesn\'t look like an email address' }, uniqueness: true
  enum role: [ :client, :manager, :admin ]

  def generate_confirmation_hash
    self.confirmation_hash = loop do
      random_hash = SecureRandom.urlsafe_base64(nil, false)
      break random_hash unless User.exists?(confirmation_hash: random_hash)
    end
  end

  def should_validate_password?
    new_record? || password.present? || password_confirmation.present?
  end
end
