require 'rails_helper'
require 'rspec/json_expectations'

describe 'GET /api/v1/players.json' do
  let(:json) { JSON.parse(response.body) }

  context 'with params[:name]' do
    context 'is 田中' do
      let(:params) { { name: '田中' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      it 'return json which has is 2 elements' do
        is_expected
        expect(json.size).to eq 2
      end
    end
  end
end
