class SessionSerializer < ActiveModel::Serializer
  attributes :user_id, :session_hash
end