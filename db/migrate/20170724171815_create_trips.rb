class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.text :comment
      t.string :destination
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end

    add_index :trips, :user_id
  end
end
