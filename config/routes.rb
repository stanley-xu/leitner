Rails.application.routes.draw do
  root 'decks#index'

  get 'home/index'

  # resources defined here will give you these rails helpers for free:
  #   deck_path, edit_deck_path, etc. (RESTful convention)
  # find them all with `rake routes`
  resources :decks, except: :show do
    member do
      get 'quiz', to: 'quiz#quiz'
      post 'results', to: 'quiz#results'
    end
    resources :cards, except: :show
  end
  
end
