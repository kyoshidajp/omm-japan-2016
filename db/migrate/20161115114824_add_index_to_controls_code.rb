class AddIndexToControlsCode < ActiveRecord::Migration[5.0]
  def change
    add_index :controls, :code
  end
end
