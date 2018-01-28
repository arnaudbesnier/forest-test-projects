class CreateTable < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'uuid-ossp'

    create_table :bikes, id: :uuid do |t|
      t.string :name
      t.string :brand
      t.column :status, :integer, default: 0
    end
  end
end
