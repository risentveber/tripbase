class CreateTimeEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :time_entries do |t|
      t.integer :user_id
      t.integer :duration
      t.integer :distance
      t.datetime :date

      t.timestamps
    end

    add_index :time_entries, :user_id
  end
end
