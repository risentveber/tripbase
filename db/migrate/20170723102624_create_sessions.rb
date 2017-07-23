class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.string :session_hash, required: true, uniq: true
      t.integer :user_id
      t.datetime :expires_at

      t.timestamps
    end

    add_index :sessions, :session_hash, unique: true
  end
end
