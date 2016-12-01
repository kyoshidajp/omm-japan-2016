class AddBibColumnToPlayer < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :bib, :integer
  end
end
