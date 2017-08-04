class TimeEntryPolicy
  class Scope < TimeEntryPolicy
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user.client?
        @scope.where(user: @user)
      else
        @scope.all
      end
    end
  end
  attr_reader :user, :time_entry

  def initialize(user, time_entry)
    @user = user
    @time_entry = time_entry
  end

  def index?
    true
  end

  def show?
    user.admin? or user.manager? or user.id == time_entry.user.id
  end

  def create?
    true
  end

  def update?
    user.admin? or user.id == time_entry.user.id
  end

  def destroy?
    user.admin? or user.id == time_entry.user.id
  end
end