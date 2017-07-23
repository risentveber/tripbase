class User < ApplicationRecord
  has_secure_password
  has_many :sessions
  enum role: [ :client, :manager, :admin ]
end
