class Control < ApplicationRecord
  has_many :result_players, dependent: :destroy
  has_many :players, through: :result_controls
end
