class UserPolicy
  attr_reader :user, :user_record

  def initialize(user, user_record)
    @user = user
    @user_record = user_record
  end

  def index?
    user.admin? or user.manager?
  end

  def show?
    user.admin? or user.manager? or user.id == user_record.id
  end

  def create?
    true
  end

  def update?
    user.admin? or user.manager? or user.id == user_record.id
  end

  def destroy?
    user.admin? or user.manager? or user.id == user_record.id
  end
end