class Api::V1::ControlsController < ApplicationController
  def index
    controls = Control.all
    render json: controls
  end
end
