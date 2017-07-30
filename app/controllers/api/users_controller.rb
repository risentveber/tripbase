class Api::UsersController < ApplicationController
  skip_before_action :authentificate, only: :create
  before_action :find_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    ap params.inspect
    if @user.save
      render json: @user
    else
      render json: ::ErrorsSerializer.new(@user), status: :precondition_failed
    end

  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: ::ErrorsSerializer.new(@user), status: :precondition_failed
    end
  end

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
