class Api::V1::ControlsController < Api::V1::APIController
  def index
    day = params[:day]
    controls = Control.where(day1: day == '1',
                             day2: day == '2')
    render json: controls
  end
end
