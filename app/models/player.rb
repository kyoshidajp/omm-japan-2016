class Player < ApplicationRecord
  validates :first_name, length: { maximum: 100 }, presence: true
  validates :last_name, length: { maximum: 100 }, presence: true
  has_many :result_players, dependent: :destroy
  has_many :results, through: :result_players
  scope :name_like, lambda { |name|
    where('last_name LIKE :name OR first_name LIKE :name', name: "%#{name}%")
  }

  def name
    "#{last_name} #{first_name}"
  end
end
