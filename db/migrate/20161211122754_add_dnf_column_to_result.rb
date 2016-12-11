class AddDnfColumnToResult < ActiveRecord::Migration[5.0]
  def change
    add_column :results, :disq, :boolean
    add_column :results, :ret, :boolean
  end
end
