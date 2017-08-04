class Api::UsersController < ApplicationController
  skip_before_action :authentificate, only: :create
  before_action :find_user, only: [:show, :update, :destroy]
=begin
  @api {get} /users/:id/ Users list
  @apiDescription Show list of users
  @apiName usersList
  @apiGroup Users
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Object[]} - Array of users
  @apiSuccess {String} -.name Name of the user
  @apiSuccess {String} -.email Email of the user
  @apiSuccess {String} -.id Email of the user
  @apiSuccess {String} -.role Role of the user (client|admin|manager)
=end
  def index
    @users = User.all
    render json: @users
  end

=begin
  @api {get} /users/:id/ Show user
  @apiDescription Show user info
  @apiName showUser
  @apiGroup Users
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {String} name Name of the user
  @apiSuccess {String} email Email of the user
  @apiSuccess {String} id Email of the user
  @apiSuccess {String} role Role of the user (client|admin|manager)
=end
  def show
    render json: @user
  end

=begin
  @api {post} /users/ Create user
  @apiDescription Create user from data
  @apiName CreateUser
  @apiGroup Users
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} user
  @apiParam (Request Fields) {String} user.password Password of user to create.
  @apiParam (Request Fields) {String} user.password_confirmation Password confirmation of user to create.
  @apiParam (Request Fields) {String} user.name Name of user to create.
  @apiParam (Request Fields) {String} user.email Email of user to create.

  @apiSuccess {String} name Name of the user created
  @apiSuccess {String} email Email of the user created.
  @apiSuccess {String} id Email of the user created.
  @apiSuccess {String} role Role of the user (client|admin|manager)
=end
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: ::ErrorsSerializer.new(@user), status: :precondition_failed
    end
  end

=begin
  @api {put|patch} /users/:id/ Update user
  @apiDescription Update specified user
  @apiName updateUser
  @apiGroup Users
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} user
  @apiParam (Request Fields) {String} user.password
  @apiParam (Request Fields) {String} user.password_confirmation
  @apiParam (Request Fields) {String} user.name Name of user
  @apiParam (Request Fields) {String} user.email Email of user

  @apiSuccess {String} name Name of the user updated
  @apiSuccess {String} email Email of the user updated
  @apiSuccess {String} id Email of the user updated
  @apiSuccess {String} role Role of the user (client|admin|manager)
=end
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: ::ErrorsSerializer.new(@user), status: :precondition_failed
    end
  end

=begin
  @api {delete} /users/:id/ Delete user
  @apiDescription Delete user specified
  @apiName deleteUser
  @apiGroup Users
  @apiHeader {String} X-Session-Hash Hash of current session
=end
  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find(params[:id])
    authorize @user
  end

  def user_params
    result = params[:user]
    result.permit(:name, :email, :password, :password_confirmation) if result
  end
end
