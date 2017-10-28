Rails.application.routes.draw do
  namespace :api do
    resources :users, exclude: [:new, :edit]
    resources :trips, exclude: [:new, :edit]
    resource :session, only: [:create, :show, :destroy]
    post 'confirmations/:hash' => 'confirmations#verify'
  end
end
