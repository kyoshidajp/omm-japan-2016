class Player < ApplicationRecord
  validates :first_name, length: { maximum: 100 }, presence: true
  validates :last_name, length: { maximum: 100 }, presence: true
  has_many :result_players, dependent: :destroy
  has_many :results, :through => :result_players
end
