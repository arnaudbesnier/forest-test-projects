class Forest::Payment
  include ForestLiana::Collection

  collection :payments

  field :id, type: 'String'
  field :amount, type: 'String', is_searchable: true
  field :currency, type: 'String'
end
