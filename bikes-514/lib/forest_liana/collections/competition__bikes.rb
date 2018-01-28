class Forest::CompetitionBike
  include ForestLiana::Collection
  collection :Competition__Bike
  field :test, type: 'String' do
    #raise 'error here'
    "test #{object.name}"
  end
  # action 'Download document', download: true
end
