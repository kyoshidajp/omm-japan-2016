module Api::V1
  class ResultsController < Api::V1::APIController
    before_action { validate_params(Validations::Result) }

    def index
      result = find_by(params[:bib].to_i)
      render json: result, include: [:players, :controls]
    end

    def bibs
      day = params[:day].to_i
      bibs = Result.where(day1: day == 1,
                          day2: day == 2).map(&:bib).uniq
      render json: bibs
    end

    private

    def find_by(bib)
      day = params[:day].to_i
      Result.find_by(bib: bib,
                     day1: day == 1,
                     day2: day == 2)
    end
  end
end
