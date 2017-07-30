class Session < ApplicationRecord
  before_create :generate_session_hash
  belongs_to :user, required: false
  attr_accessor :email, :password

  validates :email, email_format: { message: 'Doesn\'t look like an email address' }
  validates :password, presence: { message: 'Password can\'t be blank' }
  validate :auth_correctly, unless: -> () {errors.any?}

  def destroy
    touch :expires_at
  end

  def expired?
    expires_at && Time.now + 2.seconds > expires_at
  end

  protected

  def auth_correctly
    user = User.find_by_email(email)
    # If the user exists AND the password entered is correct.
    if user && user.authenticate(password)
      self.user_id = user.id
    else
      errors.add(:email, 'Wrong email or password')
    end
  end

  def generate_session_hash
    self.session_hash = loop do
      random_hash = SecureRandom.urlsafe_base64(nil, false)
      break random_hash unless Session.exists?(session_hash: random_hash)
    end
  end
end
