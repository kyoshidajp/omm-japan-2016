class AddRankToResults < ActiveRecord::Migration[5.0]
  def change
    add_column :results, :rank, :integer
  end
end
