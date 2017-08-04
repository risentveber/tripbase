class TimeEntrySerializer < ActiveModel::Serializer
  attributes :user_id, :id, :duration, :distance, :date, :date_pretty

  def date_pretty
    object.date.strftime('%m/%d/%Y') if object.date
  end
end