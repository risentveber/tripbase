FactoryGirl.define do
  factory :user do
    email 'user@gmail.com'
    name 'User'
    password 'true_pass'
    confirmed true
    password_confirmation 'true_pass'
  end

  factory :another_user, class: User do
    email 'another@gmail.com'
    name 'Another user'
    password 'true_pass'
    confirmed true
    password_confirmation 'true_pass'
  end

  factory :admin_user, class: User do
    email 'admin@gmail.com'
    name 'Admin'
    role 'admin'
    password 'true_pass'
    confirmed true
    password_confirmation 'true_pass'
  end

  factory :manager_user, class: User do
    email 'manager@gmail.com'
    name 'Manager'
    role 'manager'
    password 'true_pass'
    confirmed true
    password_confirmation 'true_pass'
  end
end