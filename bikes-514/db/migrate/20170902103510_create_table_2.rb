class CreateTable2 < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.column :bike_id, :uuid
      t.date :created_at
    end
    add_foreign_key :users, :bikes
  end
end
