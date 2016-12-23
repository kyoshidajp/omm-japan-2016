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

      describe 'first control' do
        let(:control) { json.first }
        it 'return code is 101' do
          is_expected
          expect(control['code']).to eq 101
        end

        it 'return points is 10' do
          is_expected
          expect(control['points']).to eq 10
        end

        it 'return description is \'道の曲がり\'' do
          is_expected
          expect(control['description']).to eq '道の曲がり'
        end

        it 'return lat is 36.600168' do
          is_expected
          expect(control['lat']).to eq 36.600168
        end

        it 'return lng is 137.843863' do
          is_expected
          expect(control['lng']).to eq 137.843863
        end

        it 'return day1 is true' do
          is_expected
          expect(control['day1']).to eq true
        end

        it 'return day2 is false' do
          is_expected
          expect(control['day2']).to eq false
        end
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

      describe 'first control' do
        let(:control) { json.first }
        it 'return day1 is false' do
          is_expected
          expect(control['day1']).to eq false
        end

        it 'return day2 is true' do
          is_expected
          expect(control['day2']).to eq true
        end
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
