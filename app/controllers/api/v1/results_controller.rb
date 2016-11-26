class Api::V1::ResultsController < ApplicationController
  def index
    results = Result.limit(100)
    render json: results, include: [:players, :controls]
  end
end
