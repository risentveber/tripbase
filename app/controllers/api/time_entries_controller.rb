class Api::TimeEntriesController < ApplicationController
  before_action :find_user, only: [:show, :update, :destroy]

  def index
    @time_entries = TimeEntry.all
    render json: @time_entries
  end

  def show

  end

  def create

  end

  def update

  end

  def destroy

  end

  private

  def find_user
    @time_entry = TimeEntry.find(params[:id])
    authorize @time_entry
  end

  def time_entry_params
    result = params[:time_entry]
    result.permit(:user_id, :duration, :date, :distance) if result
  end
end
