require 'rails_helper'

describe Player do
  it 'returns a full name' do
    player = Player.new(last_name: '吉田',
                        first_name: '勝彦',
                        bib: 237)
    expect(player.name).to eq '吉田 勝彦'
  end
end
