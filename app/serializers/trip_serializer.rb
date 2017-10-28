class TripSerializer < ActiveModel::Serializer
  attributes :user_id, :id, :comment, :destination, :start_date, :end_date
end