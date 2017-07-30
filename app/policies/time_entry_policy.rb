class TimeEntryPolicy
  attr_reader :user, :time_entry

  def initialize(user, time_entry)
    @user = user
    @time_entry = time_entry
  end

  def update?
    user.admin?
  end
end