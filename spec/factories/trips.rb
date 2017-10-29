FactoryBot.define do
  factory :trip do
    start_date Time.now
    end_date Time.now + 1.day
    destination 'Test'
  end
end
