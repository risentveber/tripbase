class SessionSerializer < ActiveModel::Serializer
  attributes :user_id, :expires_at
end