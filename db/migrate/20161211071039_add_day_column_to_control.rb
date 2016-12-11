class AddDayColumnToControl < ActiveRecord::Migration[5.0]
  def change
    add_column :controls, :day1, :boolean
    add_column :controls, :day2, :boolean
  end
end
