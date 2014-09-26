HouseAngular::Application.routes.draw do
  match'sitemap.xml', :to=>'home#sitemap',:defaults => {:format => :xml}

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  devise_for :users

  root :to => "home#index"

  get "/adverts", :to => 'home#index'
  get "/blogs", :to => 'home#index'
  get "/notariat", :to => 'home#index'
  get "/management", :to => 'home#index'
  get "/lawyer", :to => 'home#index'
  get '/adverts/*ng_route', :to => 'home#index'
  get '/blogs/*ng_route', :to => 'home#index'

  get '/sign_in', :to => 'home#index'
  get '/sign_up', :to => 'home#index'

  get '/adverts_new', :to => 'home#index'
  get '/adverts_update', :to => 'home#index'
  get 'service/contacts/mail'
  get 'service/regions/search'
  get '/search', :to => 'home#index'
  post "contact_us/send_email", :as => "send_email"
  post "contact_us/newsletter", :as => "newsletter"
  get "service/managements/new_adverts"
  post "service/managements/save_images"

  match 'img', :to => redirect('/uploads/advert/photo')


  namespace :service do
    resources :products, :to => 'adverts'
    resources :operation_types
    resources :categories
    resources :regions
    resources :product_images, :to => 'advert_images'
    resources :streets
    resources :cities
    resources :business_center_classes
    resources :currency_users
    resources :districts
    resources :doors
    resources :flat_types
    resources :floor_types
    resources :house_materials
    resources :house_types
    resources :metro_stations
    resources :purpouse_lands
    resources :rooms_types
    resources :state_repairs
    resources :layouts
    resources :movies
    resources :contacts
    resources :emails
    resources :notariats
    resources :managements
    resources :lawyers
    resources :blog_themes
    resources :comments



  end


  match '/service/current/submissions', :to => 'service/users#usersubmission'
  match '/service/current/logout', :to => 'service/users#logout'


  #match 'auth/:provider/callback', :to => 'sessions#create'
  #match 'auth/failure', :to => redirect('/products')
  #match 'signout', :to => 'sessions#destroy', :as => 'signout'
  #match 'signin', :to => 'sessions#new', :as => 'signin'
end
