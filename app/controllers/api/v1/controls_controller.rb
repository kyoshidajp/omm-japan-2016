module Api::V1
  class ControlsController < Api::V1::APIController
    before_action { validate_params(Validations::Control) }

    def index
      day = params[:day]
      controls = Control.where(day1: day == '1',
                               day2: day == '2')
      render json: controls
    end
  end
end
