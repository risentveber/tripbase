class ApplicationController < ActionController::API
  include Pundit
  before_action :authentificate

  def current_user
    @current_user ||= User.includes(:sessions)
      .where(sessions: {session_hash: get_session_hash })
      .where("sessions.expires_at < ? OR sessions.expires_at IS NULL", Date.today)
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
