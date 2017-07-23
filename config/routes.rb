Rails.application.routes.draw do
  namespace :api do
    resources :users
    resource :session
  end
end
