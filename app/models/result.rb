class Result < ApplicationRecord
  #belongs_to :player1, :class_name => 'Player', :foreign_key => 'player1_id'
  #belongs_to :player2, :class_name => 'Player', :foreign_key => 'player2_id'
  has_many :result_players, dependent: :destroy
  has_many :players, :through => :result_players
  belongs_to :category
end
