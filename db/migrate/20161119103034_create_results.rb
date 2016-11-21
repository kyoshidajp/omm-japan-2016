class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.integer :bib
      t.string :route
      t.string :time
      t.integer :score
      t.integer :demerit_point
      t.boolean :day1
      t.boolean :day2

      t.timestamps
    end
  end
end
