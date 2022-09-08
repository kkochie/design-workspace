class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :proname
      t.string :prostatus
      t.text :summary
      t.belongs_to :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
