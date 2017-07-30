class User < ApplicationRecord
  has_secure_password
  attr :password_confirmation
  has_many :sessions, dependent: :destroy
  has_many :time_entries, dependent: :destroy
  validates :password, confirmation: true, presence: true
  validates :password_confirmation, presence: true
  validates :name, presence: true
  validates :email, email_format: { message: 'Doesn\'t look like an email address' }, uniqueness: true
  enum role: [ :client, :manager, :admin ]
end
