class Api::TripsController < ApplicationController
  before_action :find_trip, only: [:show, :update, :destroy]
=begin
  @api {get} /trips/ Time entries list
  @apiDescription Show list of time entries
  @apiName timeEtnriesList
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Object[]} - Array of time entries
  @apiSuccess {Number} -.distance Distance in meters
  @apiSuccess {Number} -.duration Duration in minutes
  @apiSuccess {String} -.date Date of the jogging time
=end
  def index
    @trips = policy_scope(Trip)
    render json: @trips
  end

=begin
  @api {get} /trips/:id/ Show time entry
  @apiDescription Show time entry info
  @apiName showTrip
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Number} distance Distance in meters
  @apiSuccess {Number} durations Duration in minutes
  @apiSuccess {String} id Id of the record
  @apiSuccess {String} date Date of the jogging time
=end
  def show
    render json: @trip
  end

=begin
  @api {post} /trips/ Create time entry
  @apiDescription Create time entry from data
  @apiName CreateTrip
  @apiGroup Trips
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
    @trip = Trip.new(trip_params)
    @trip.user_id = current_user.id
    if @trip.save
      render json: @trip, status: :created
    else
      render json: ::ErrorsSerializer.new(@trip), status: :precondition_failed
    end
  end

=begin
  @api {put|patch} /trips/:id/ Update time entry
  @apiDescription Update time entry with id = :id
  @apiName UpdateTrip
  @apiGroup Trips
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
    if @trip.update(trip_params)
      render json: @trip, status: :created
    else
      render json: ::ErrorsSerializer.new(@trip), status: :precondition_failed
    end
  end

=begin
  @api {delete} /trips/:id/ Delete time entry
  @apiDescription Delete time entry
  @apiName deleteTrip
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
=end
  def destroy
    @trip.destroy
  end

  private

  def find_trip
    @trip = Trip.find(params[:id])
    authorize @trip
  end

  def trip_params
    result = params[:trip]
    result.permit(:end_date, :start_date, :comment, :destination) if result
  end
end
