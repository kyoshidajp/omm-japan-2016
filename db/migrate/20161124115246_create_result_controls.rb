class CreateResultControls < ActiveRecord::Migration[5.0]
  def change
    create_table :result_controls do |t|
      t.references :result, foreign_key: true
      t.references :control, foreign_key: true

      t.timestamps
    end
  end
end
