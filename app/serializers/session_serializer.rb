class SessionSerializer < ActiveModel::Serializer
  attributes :session_hash, :expires_at
end