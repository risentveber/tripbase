class ApplicationController < ActionController::API
  include Pundit
  before_action :authentificate
  protect_from_forgery with: :null

  def current_user
    @current_user ||= User.includes(:sessions)
      .where( sessions: { session_hash: request.headers['X-Session-Hash'] })
      .where("sessions.expires_at < ? OR sessions.expires_at IS NULL", Date.new)
      .first
  end

  def authentificate
    render status: :unauthorized unless current_user
  end
end
