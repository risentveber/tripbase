class User < ApplicationRecord
  has_secure_password
  has_many :sessions
  has_many :time_entries
  enum role: [ :client, :manager, :admin ]
end
