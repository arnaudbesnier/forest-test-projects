class Bike < ApplicationRecord
  enum status: [:val, :vol, :vul]
  has_many :users
end
