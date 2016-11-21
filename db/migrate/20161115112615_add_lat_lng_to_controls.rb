class AddLatLngToControls < ActiveRecord::Migration[5.0]
  def change
    add_column :controls, :lat, :float
    add_column :controls, :lng, :float
  end
end
