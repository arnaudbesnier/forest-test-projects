class Forest::Bike
  include ForestLiana::Collection

  collection :bikes

  field :smart9, type: 'String', is_filterable: true do
    "- #{object.brand} -"
  end
  field :smart, type: 'String', is_filterable: false do
    "- #{object.brand} -"
  end

  action 'Repair', fields: [{
    field: 'comment', type: 'Enum', defaultValue: 'top', enums: ['top', 'bad']
  }]
  action 'Download document', download: true
end
