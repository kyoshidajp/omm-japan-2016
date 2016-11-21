class CreateControls < ActiveRecord::Migration[5.0]
  def change
    create_table :controls do |t|
      t.integer :code
      t.integer :points
      t.string :description

      t.timestamps
    end
  end
end
