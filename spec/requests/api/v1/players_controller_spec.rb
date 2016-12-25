require 'rails_helper'
require 'rspec/json_expectations'

describe 'GET /api/v1/players.json' do
  let(:json) { JSON.parse(response.body) }

  context 'with params[:name] and params[:page] and params[:per]' do
    context 'name is 田中' do
      let(:params) { { name: '田中', page: 1, per: 10 } }

      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'return json which has players' do
        is_expected
        expect(json['players'].size).to eq 2
      end

      it 'return json which total_count is 2' do
        is_expected
        expect(json['total_count']).to eq 2
      end
    end

    context 'page is not number' do
      let(:params) { { name: '田中', page: 'wrong', per: 10 } }

      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'return page error message' do
        is_expected
        expect(json).to include_json(
          error: {
            page: ['is not a number']
          }
        )
      end
    end

    context 'per is not number' do
      let(:params) { { name: '田中', page: 1, per: 'bad' } }

      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'return per error message' do
        is_expected
        expect(json).to include_json(
          error: {
            per: ['is not a number']
          }
        )
      end
    end
  end

  context 'with params[:name] and params[:page] without params[:per]' do
    let(:params) { { name: '田中', page: 1 } }

    it 'return status code 200' do
      is_expected.to eq 200
    end

    it 'return per error message' do
      is_expected
      expect(json).to include_json(
        error: {
          per: ['can\'t be blank']
        }
      )
    end
  end

  context 'with params[:name] and params[:per] without params[:page]' do
    let(:params) { { name: '田中', per: 10 } }

    it 'return status code 200' do
      is_expected.to eq 200
    end

    it 'return page error message' do
      is_expected
      expect(json).to include_json(
        error: {
          page: ['can\'t be blank']
        }
      )
    end
  end

  context 'with params[:name] without params[:page] and params[:per]' do
    let(:params) { { name: '田中' } }

    it 'return status code 200' do
      is_expected.to eq 200
    end

    it 'return page error message' do
      is_expected
      expect(json).to include_json(
        error: {
          page: ['can\'t be blank'],
          per: ['can\'t be blank']
        }
      )
    end
  end

  context 'without params[:name] and params[:page] and params[:per]' do
    let(:params) { {} }

    it 'return status code 200' do
      is_expected.to eq 200
    end

    it 'return page error message' do
      is_expected
      expect(json).to include_json(
        error: {
          name: ['can\'t be blank'],
          page: ['can\'t be blank'],
          per: ['can\'t be blank']
        }
      )
    end
  end
end
