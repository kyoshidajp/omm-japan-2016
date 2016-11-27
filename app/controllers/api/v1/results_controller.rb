class Api::V1::ResultsController < ApplicationController
  def index
    results = Result.limit(5)
    render json: results, include: [:players, :controls]
  end
end
