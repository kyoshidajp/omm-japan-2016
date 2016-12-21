module Api::V1::Validations
  class Result
    include ActiveModel::Validations

    attr_accessor :day, :bib, :format

    validates :day, presence: true, inclusion: { in: %w(1 2) }
    validates :bib, presence: true, numericality: true
    validates :format, presence: true

    def initialize(params = {})
      @day = params[:day]
      @bib = params[:bib]
      @format = params[:format]
      ActionController::Parameters.new(params.to_h).permit(:day, :bib, :format)
    end
  end
end
