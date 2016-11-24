class Result < ApplicationRecord
  has_many :result_players, dependent: :destroy
  has_many :players, :through => :result_players
  belongs_to :category
end
