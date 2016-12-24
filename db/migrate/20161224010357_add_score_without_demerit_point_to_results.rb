class AddScoreWithoutDemeritPointToResults < ActiveRecord::Migration[5.0]
  def change
    add_column :results, :score_without_demerit_point, :integer
    add_column :results, :rank_without_demerit_point, :integer
  end
end
