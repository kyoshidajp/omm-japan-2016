Rails.application.routes.draw do
  root to: 'welcome#index'
  namespace :api do
    namespace :v1 do
      resources :controls, only: [:index], format: 'json'
      resources :results, only: [:index, :show], format: 'json'
      get :bibs, to: 'results#bibs'
    end
  end
end
