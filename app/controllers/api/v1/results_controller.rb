class Api::V1::ResultsController < ApplicationController
  def index
    results = Result.all
    render json: results, include: [:players, :controls]
  end

  def show
    result = Result.find_by(bib: params[:id])
    render json: result, include: [:players, :controls]
  end

  def bibs
    bibs = Result.all.map(&:bib)
    render json: bibs
  end
end
