require "rails_helper"

describe 'Session' do
  it 'No session if not auth' do
    get '/api/session'

    expect(response).to have_http_status(401)
    expect(response.body).to eq(' ')
  end

  it 'Empty user session creation' do
    post '/api/session'

    body = JSON.parse(response.body)
    expect(body['errors']['email']).to eq('Doesn\'t look like an email address')
    expect(body['errors']['password']).to eq('Password can\'t be blank')
  end

  it 'Try to create session with wrong cridentails' do
    user = create(:user)

    post '/api/session', params: { session: { email: user.email, password: 'wrong_pass' } }

    body = JSON.parse(response.body)

    expect(body['errors']['email']).to eq('Wrong email or password')
  end

  it 'Rigth session creation' do
    user = create(:user)

    post '/api/session', params: { session: { email: user.email, password: 'true_pass' } }

    body = JSON.parse(response.body)
    expect(body['session_hash']).to eq(Session.first.session_hash)
    expect(body['expires_at']).to eq(nil)
  end

  it 'Current session info' do
    user = create(:user)
    session = build(:session, user_id: user.id)
    session.save validate: false

    get '/api/session', headers: {'X-Session-Hash' => session.session_hash}

    body = JSON.parse(response.body)
    expect(body['session_hash']).to eq(session.session_hash)
    expect(body['expires_at']).to eq(nil)
  end

  it 'Current session info' do
    user = create(:user)
    session = build(:session, user_id: user.id)
    session.save validate: false

    delete '/api/session', headers: {'X-Session-Hash' => session.session_hash}

    expect(response).to have_http_status(204)
    ap Session.first.expires_at
    ap DateTime.new
    expect(Session.first.expired?).to be true
  end
end