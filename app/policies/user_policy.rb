class UserPolicy
  attr_reader :user, :user_record

  def initialize(user, user_record)
    @user = user
    @user_record = user_record
  end

  def index?
    true
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
    ap user.admin?
    ap user.manager?
    ap user.id
    ap user_record.id
    user.admin? or user.manager? or user.id == user_record.id
  end
end