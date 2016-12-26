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

      it 'return bib is 163' do
        is_expected
        expect(json['bib']).to eq 163
      end

      it 'return score is 880' do
        is_expected
        expect(json['score']).to eq 880
      end

      it 'return demerit_point is 0' do
        is_expected
        expect(json['demerit_point']).to eq 0
      end

      it 'return day1 is true' do
        is_expected
        expect(json['day1']).to eq true
      end

      it 'return day2 is false' do
        is_expected
        expect(json['day2']).to eq false
      end

      it 'return rank is 1' do
        is_expected
        expect(json['rank']).to eq 1
      end

      it 'return disq is false' do
        is_expected
        expect(json['disq']).to eq false
      end

      it 'return ret is false' do
        is_expected
        expect(json['ret']).to eq false
      end
    end

    context 'day is 2 and bib is 122' do
      let(:params) { { day: '2', bib: '122' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'return day1 is false' do
        is_expected
        expect(json['day1']).to eq false
      end

      it 'return day2 is true' do
        is_expected
        expect(json['day2']).to eq true
      end

      it 'return rank is 5' do
        is_expected
        expect(json['rank']).to eq 5
      end

      it 'return score is 490' do
        is_expected
        expect(json['score']).to eq 490
      end
    end

    context 'day is 1 and bib is not number' do
      let(:params) { { day: 1, bib: 'string' } }
      it 'return status code 400' do
        is_expected.to eq 400
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
      it 'return status code 400' do
        is_expected.to eq 400
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
      it 'return status code 400' do
        is_expected.to eq 400
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
    it 'return status code 400' do
      is_expected.to eq 400
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
    it 'return status code 400' do
      is_expected.to eq 400
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

describe 'GET /api/v1/bibs.json' do
  let(:json) { JSON.parse(response.body) }

  context 'with params[:day]' do
    context 'day is 1' do
      let(:params) { { day: '1' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'data size is 10' do
        is_expected
        expect(json.size).to eq 10
      end
    end

    context 'day is 2' do
      let(:params) { { day: '2' } }
      it 'return status code 200' do
        is_expected.to eq 200
      end

      it 'data size is 10' do
        is_expected
        expect(json.size).to eq 10
      end
    end
  end
end
