require "rails_helper"

describe 'User' do
  it 'Should\'t created without name' do
    post '/api/users', params: { user: { email: 'test@gmail.com', password: 'wrong_pass' } }

    body = JSON.parse(response.body)
    expect(response).to have_http_status(412)
    expect(body['errors']['name']).to eq('Can\'t be blank')
  end

  it 'Should\'t created with mismatch between password and it\'s confirmation' do
    post '/api/users', params: { user: {
        email: 'test@gmail.com',
        name: 'Test',
        password: 'true_pass',
        password_confirmation: 'wrong_pass'
    } }

    body = JSON.parse(response.body)
    expect(response).to have_http_status(412)
    expect(body['errors']['password_confirmation']).to eq('Doesn\'t match password')
  end

  it 'Should normally created when all validations are passed' do
    post '/api/users', params: { user: {
        email: 'test@gmail.com',
        name: 'Test',
        password: 'true_pass',
        password_confirmation: 'true_pass'
    } }

    body = JSON.parse(response.body)
    expect(response).to have_http_status(:created)
    expect(body['id']).to eq(1)
    expect(body['name']).to eq('Test')
    expect(body['role']).to eq('client')
  end

  it 'Shouldn\'t be able to create user with already used email' do
    user = create(:user)

    post '/api/users', params: { user: {
        email: user.email,
        name: 'Test',
        password: 'true_pass',
        password_confirmation: 'true_pass'
    } }

    body = JSON.parse(response.body)
    expect(response).to have_http_status(:precondition_failed)
    expect(body['errors']['email']).to eq('Has already been taken')
  end
end