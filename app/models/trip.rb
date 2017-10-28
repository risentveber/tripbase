class Trip < ApplicationRecord
  belongs_to :user
  # validates :distance, presence: true,
  #           numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  # validates :date, presence: true
  # validates :duration, presence: true,
  #           numericality: { only_integer: true, greater_than_or_equal_to: 1 }
end
