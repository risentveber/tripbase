class Api::TripsController < ApplicationController
  before_action :find_trip, only: [:show, :update, :destroy]
=begin
  @api {get} /trips/ Trips list
  @apiDescription Show list of trips
  @apiName tripsList
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Object[]} - Array of time entries
  @apiSuccess {Number} -.start_date The date when trip starts
  @apiSuccess {Number} -.end_date The date when trip ends
  @apiSuccess {String} -.destination Destination of the trip
  @apiSuccess {String} -.comment Just comment
=end
  def index
    @trips = policy_scope(Trip)
                 .where(user_id: params[:user_id].present? ? params[:user_id] : current_user.id)

    render json: @trips
  end

=begin
  @api {get} /trips/:id/ Show trip
  @apiDescription Show trip info
  @apiName showTrip
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiSuccess {Number} -id The id of the trip
  @apiSuccess {Number} -start_date The date when trip starts
  @apiSuccess {Number} -end_date The date when trip ends
  @apiSuccess {String} -destination Destination of the trip
  @apiSuccess {String} -comment Just comment
=end
  def show
    render json: @trip
  end

=begin
  @api {post} /trips/ Create trip
  @apiDescription Create trip from data
  @apiName CreateTrip
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} trip
  @apiParam (Request Fields) {Number} trip.distance Distance in meters
  @apiParam (Request Fields) {Number} trip.duration Duration in minutes
  @apiParam (Request Fields) {String} trip.date Date of the jogging time

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
  @api {put|patch} /trips/:id/ Update trip
  @apiDescription Update trip with id = :id
  @apiName UpdateTrip
  @apiGroup Trips
  @apiHeader {String} X-Session-Hash Hash of current session
  @apiParam (Request Fields) {Object} trip
  @apiParam (Request Fields) {Number} trip.distance Distance in meters
  @apiParam (Request Fields) {Number} trip.duration Duration in minutes
  @apiParam (Request Fields) {String} trip.date Date of the jogging time

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
  @api {delete} /trips/:id/ Delete trip
  @apiDescription Delete trip
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
