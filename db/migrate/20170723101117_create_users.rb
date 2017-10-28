class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :confirmation_hash, required: true, uniq: true
      t.string :email, uniq: true
      t.string :password_digest
      t.boolean :confirmed, default: false
      t.column :role, :integer, default: 0

      t.timestamps
    end
  end
end
