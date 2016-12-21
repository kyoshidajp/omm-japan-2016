module Api::V1::Validations
  class Control
    include ActiveModel::Validations

    attr_accessor :day, :format

    validates :day, presence: true, inclusion: { in: %w(1 2) }
    validates :format, presence: true

    def initialize(params = {})
      @day = params[:day]
      @format = params[:format]
      ActionController::Parameters.new(params.to_h).permit(:day, :format)
    end
  end
end
