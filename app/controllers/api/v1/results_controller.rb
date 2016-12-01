class Api::V1::ResultsController < ApplicationController

  def index 
    result = if params[:name].present?
               name = params[:name]
               Result.has_player_name_like(name)
             elsif params[:bib].present?
               Result.find_by(bib: params[:bib])
             end
    render json: result, include: [:players, :controls]
  end

  def bibs
    bibs = Result.all.map(&:bib)
    render json: bibs
  end
end
