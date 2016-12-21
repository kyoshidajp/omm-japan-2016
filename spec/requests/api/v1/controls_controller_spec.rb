require 'rails_helper'
require 'rspec/json_expectations'

describe 'GET /api/v1/controls.json' do
  let(:json) { JSON.parse(response.body) }

  context 'with params[:day]' do
    context 'is 1' do
      let(:params) { { day: '1' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      xit 'return json which has is 26 elements' do
        is_expected
        expect(json.size).to eq 27
      end
    end

    context 'is 2' do
      let(:params) { { day: 2 } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      xit 'return json which has is 26 elements' do
        is_expected
        expect(json.size).to eq 31
      end
    end

    context 'is neither 1 nor 2' do
      let(:params) { { day: 3 } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      it 'return day error message' do
        is_expected
        expect(json).to include_json(
          error: {
            day: ['is not included in the list']
          }
        )
      end
    end
  end

  context 'without params[:day]' do
    it 'return status code 200' do
      is_expected.to eq 200
    end
    it 'return day error message' do
      is_expected
      expect(json).to include_json(
        error: {
          day: ['can\'t be blank']
        }
      )
    end
  end
end
