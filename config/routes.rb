Rails.application.routes.draw do
  namespace :api do
    resources :users, exclude: [:new, :edit]
    resources :time_entries, exclude: [:new, :edit]
    resource :session, only: [:create, :show, :destroy]
  end
end
