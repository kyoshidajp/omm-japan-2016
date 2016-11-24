class Api::V1::ResultsController < ApplicationController
  def index
    results = Result.all
    render json: results, include: [:players, :controls]
  end
end
