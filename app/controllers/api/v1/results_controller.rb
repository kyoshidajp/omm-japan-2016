module Api::V1
  class ResultsController < Api::V1::APIController
    before_action { validate_params(Validations::Result) }

    def index
      result = if params[:name].present?
                 name = params[:name]
                 Result.has_player_name_like(name)
               elsif params[:bib].present?
                 find_by(params[:bib].to_i)
               end
      render json: result, include: [:players, :controls]
    end

    def bibs
      bibs = Result.all.map(&:bib)
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
