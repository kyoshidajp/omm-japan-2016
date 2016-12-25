module Api::V1::Validations
  class Player
    include ActiveModel::Validations

    attr_accessor :name, :page, :per, :format

    validates :name, presence: true
    validates :page, presence: true, numericality: true
    validates :per, presence: true, numericality: true
    validates :format, presence: true

    def initialize(params = {})
      @name = params[:name]
      @page = params[:page]
      @per = params[:per]
      @format = params[:format]
      ActionController::Parameters.new(params.to_h).permit(:name, :page, :per, :format)
    end
  end
end
