FactoryGirl.define do
  factory :user do
    email 'boris@gmail.com'
    password 'true_pass'
    password_confirmation 'true_pass'
  end
end