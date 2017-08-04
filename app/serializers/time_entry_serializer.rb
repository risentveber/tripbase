class TimeEntrySerializer < ActiveModel::Serializer
  attributes :user_id, :id, :duration, :distance, :date
  def date
    object.date.strftime('%m/%d/%Y') if object.date
  end
end