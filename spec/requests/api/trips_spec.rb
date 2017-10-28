require "rails_helper"

describe 'Trip' do
  it 'Shouldn\'t return any data for not auth user' do
    get '/api/trips/'

    expect(response).to have_http_status(:unauthorized)
  end


  it 'Shouldn\'t created any trip for not auth user' do
    post '/api/trips/'

    expect(response).to have_http_status(:unauthorized)
    expect(Trip.count).to equal(0)
  end

  it 'Should create trip' do
    user = create(:user)
    session = build(:session, user_id: user.id)
    session.save validate: false

    post '/api/trips', headers: {'X-Session-Hash' => session.session_hash}, params: {
        trip: {
            comment: 'testcomment',
            destination: 'testdestination'
        }
    }

    expect(response).to have_http_status(:created)
    expect(Trip.count).to eq(1)
    trip = Trip.first
    expect(trip.comment).to eq('testcomment')
    expect(trip.destination).to eq('testdestination')
  end

  it 'Client should see only his own trip' do
    user = create(:user)
    another_user = create(:another_user)
    create_list(:trip, 3, user: user)
    create_list(:trip, 3, user: another_user)

    session = build(:session, user_id: user.id)
    session.save validate: false

    get '/api/trips', headers: { 'X-Session-Hash' => session.session_hash }

    expect(response).to have_http_status(:ok)
    body = JSON.parse(response.body)
    expect(body.length).to eq(3)
    expect(body.map{|x| x['user_id'] == user.id}.all?).to be true
  end

  it 'Admin should see all trips' do
    user = create(:user)
    another_user = create(:another_user)
    admin_user = create(:admin_user)
    create_list(:trip, 3, user: user)
    create_list(:trip, 3, user: another_user)

    session = build(:session, user_id: admin_user.id)
    session.save validate: false

    get '/api/trips', headers: { 'X-Session-Hash' => session.session_hash }

    expect(response).to have_http_status(:ok)
    body = JSON.parse(response.body)
    expect(body.length).to eq(6)
  end
end