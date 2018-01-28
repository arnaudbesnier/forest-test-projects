Rails.application.routes.draw do
  namespace :forest do
    resources :payments
    post '/actions/download-document', controller: :bikes, action: :download
  end



  mount ForestLiana::Engine => '/forest'
end
