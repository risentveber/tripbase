class ApplicationController < ActionController::API
  include Pundit
  before_action :authentificate

  def current_user
    @current_user ||= User.includes(:sessions)
      .where(confirmed: true)
      .where(sessions: {session_hash: get_session_hash })
      .where("sessions.expires_at < ? OR sessions.expires_at IS NULL", Date.today)
      .first
  end

  def default_url_options
    if Rails.env.production?
      {:host => "tripbase.risentveber.ru"}
    else
      {:host => "tripbase.dev"}
    end
  end

  protected

  def authentificate
    render status: :unauthorized unless get_session_hash and current_user
  end

  def get_session_hash
    request.headers['X-Session-Hash']
  end
end
