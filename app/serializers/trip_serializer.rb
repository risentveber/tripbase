class TripSerializer < ActiveModel::Serializer
  attributes :user_id, :id, :comment, :destination, :start_date, :end_date

  def date_pretty
    object.date.strftime('%m/%d/%Y') if object.date
  end
end