Rails.application.routes.draw do
  root to: 'welcome#index'
  namespace :api do
    namespace :v1 do
      resources :players, only: [:index], format: 'json'
      resources :controls, only: [:index], format: 'json'
      resources :results, only: [:index], format: 'json'
      get :bibs, to: 'results#bibs'
    end
  end
end
