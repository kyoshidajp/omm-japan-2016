class Player < ApplicationRecord
  validates :first_name, length: { maximum: 100 }, presence: true
  validates :last_name, length: { maximum: 100 }, presence: true
  has_many :result_players, dependent: :destroy
  has_many :results, :through => :result_players
  #has_many :player1_results, class_name: 'Result', :foreign_key => 'player1_id'
  #has_many :player2_results, class_name: 'Result', :foreign_key => 'player2_id'
end
