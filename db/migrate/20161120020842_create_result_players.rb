class CreateResultPlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :result_players do |t|
      t.references :result, foreign_key: true
      t.references :player, foreign_key: true

      t.timestamps
    end
  end
end
