class Api::TimeEntriesController < ApplicationController
  before_action :find_time_entry, only: [:show, :update, :destroy]
=begin
  @api {get} /time_entries/ Time entries list
  @apiDescription Show list of time entries
  @apiName timeEtnriesList
  @apiGroup TimeEntries
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Object[]} - Array of time entries
  @apiSuccess {Number} -.distance Distance in meters
  @apiSuccess {Number} -.duration Duration in minutes
  @apiSuccess {String} -.date Date of the jogging time
=end
  def index
    @time_entries = policy_scope(TimeEntry)
    render json: @time_entries
  end

=begin
  @api {get} /time_entries/:id/ Show time entry
  @apiDescription Show time entry info
  @apiName showTimeEntry
  @apiGroup TimeEntries
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Number} distance Distance in meters
  @apiSuccess {Number} durations Duration in minutes
  @apiSuccess {String} id Id of the record
  @apiSuccess {String} date Date of the jogging time
=end
  def show
    render json: @user
  end

=begin
  @api {post} /time_entries/ Create time entry
  @apiDescription Create time entry from data
  @apiName CreateTimeEntry
  @apiGroup TimeEntries
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} time_entry
  @apiParam (Request Fields) {Number} time_entry.distance Distance in meters
  @apiParam (Request Fields) {Number} time_entry.duration Duration in minutes
  @apiParam (Request Fields) {String} time_entry.date Date of the jogging time

  @apiSuccess {Number} distance Distance in meters
  @apiSuccess {Number} duration Time in minutes
  @apiSuccess {String} id Id of the record
  @apiSuccess {String} date Date of the jogging time
=end
  def create
    @time_entry = TimeEntry.new(time_entry_params)
    @time_entry.user_id = current_user.id
    if @time_entry.save
      render json: @time_entry
    else
      render json: ::ErrorsSerializer.new(@time_entry), status: :precondition_failed
    end
  end

=begin
  @api {put|patch} /time_entries/:id/ Update time entry
  @apiDescription Update time entry with id = :id
  @apiName UpdateTimeEntry
  @apiGroup TimeEntries
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} time_entry
  @apiParam (Request Fields) {Number} time_entry.distance Distance in meters
  @apiParam (Request Fields) {Number} time_entry.duration Duration in minutes
  @apiParam (Request Fields) {String} time_entry.date Date of the jogging time

  @apiSuccess {Number} distance Distance in meters
  @apiSuccess {Number} duration Time in minutes
  @apiSuccess {Number} id Id of the record
  @apiSuccess {String} date Date of the jogging time
=end
  def update

  end

=begin
  @api {delete} /time_entries/:id/ Delete time entry
  @apiDescription Delete time entry
  @apiName deleteTimeEntry
  @apiGroup TimeEntries
  @apiHeader {String} X-Session-Hash Hash of current session
=end
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
