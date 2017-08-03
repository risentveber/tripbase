class Api::SessionsController < ApplicationController
  skip_before_action :authentificate, only: :create
  before_action :find_session, except: :create

=begin
  @api {post} /session/ Create session
  @apiDescription Create session from credentails
  @apiName CreateSession
  @apiGroup Session
  @apiParam (Request Fields) {Object} session
  @apiParam (Request Fields) {String} session.password Password of user to login
  @apiParam (Request Fields) {String} session.email Email of user to login

  @apiSuccess {String} session_hash Hash that make every session uniq
  @apiSuccess {String} expires_at Date where session is expired
=end
  def create
    @session = Session.new(session_params)
    if @session.save
      render json: @session
    else
      render json: ::ErrorsSerializer.new(@session), status: :precondition_failed
    end
  end

=begin
  @api {get} /session/ Show session
  @apiDescription Request current session info
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiName GetSession
  @apiGroup Session

  @apiSuccess {String} session_hash Hash that make every session uniq
  @apiSuccess {Number} user_id Id of user session belongs to
=end
  def show
    if @session
      render json: @session
    else
      render status: 404
    end
  end

=begin
  @api {delete} /session/ Destroy session
  @apiDescription Process logout
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiName LogoutSession
  @apiGroup Session
=end
  def destroy
    @session.destroy
    render status: :no_content
  end

  protected

  def session_params
    result = params[:session]
    result.permit(:email, :password) if result
  end

  def find_session
    @session = Session.find_by_session_hash(request.headers['X-Session-Hash'])
  end
end
