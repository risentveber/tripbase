class ApplicationController < ActionController::API
  include Pundit
  before_action :authentificate

  def current_user
    @current_user ||= User.includes(:sessions)
      .where(session: {session_hash: get_session_hash })
      .where("session.expires_at < ? OR session.expires_at IS NULL", Date.new)
      .first
  end

  def authentificate
    render status: :unauthorized unless get_session_hash and current_user
  end
  protected

  def get_session_hash
    request.headers['X-Session-Hash']
  end
end
