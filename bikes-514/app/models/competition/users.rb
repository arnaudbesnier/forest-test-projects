class Competition::User < ApplicationRecord
  belongs_to :bike
  # belongs_to :bike, class_name: "Competition::Bike"
end
