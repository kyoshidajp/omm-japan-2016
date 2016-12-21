require 'rails_helper'
require 'rspec/json_expectations'

describe 'GET /api/v1/results.json' do
  let(:json) { JSON.parse(response.body) }

  context 'with params[:day] and params[:bib]' do
    context 'day is 1 and bib is 163' do
      let(:params) { { day: '1', bib: '163' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
    end

    context 'day is 1 and bib is not number' do
      let(:params) { { day: 2, bib: 'string' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      it 'return bib error message' do
        is_expected
        expect(json).to include_json(
          error: { bib: ['is not a number'] }
        )
      end
    end

    context 'day is neither 1 nor 2 and bib 163' do
      let(:params) { { day: 3, bib: 163 } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      it 'return day error message' do
        is_expected
        expect(json).to include_json(
          error: { day: ['is not included in the list'] }
        )
      end
    end

    context 'is neither 1 nor 2 and bib is not number' do
      let(:params) { { day: 3, bib: 'wrong' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end
      it 'return day and bib error message' do
        is_expected
        expect(json).to include_json(
          error: {
            day: ['is not included in the list'],
            bib: ['is not a number']
          }
        )
      end
    end
  end

  context 'with params[:bib] and without params[:day]' do
    let(:params) { { bib: '163' } }
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

  context 'with params[:day] and without params[:bib]' do
    let(:params) { { day: '1' } }
    it 'return status code 200' do
      is_expected.to eq 200
    end
    it 'return bib error message' do
      is_expected
      expect(json).to include_json(
        error: {
          bib: ['can\'t be blank']
        }
      )
    end
  end
end
