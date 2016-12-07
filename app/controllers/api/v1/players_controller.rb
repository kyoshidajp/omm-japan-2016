class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.name_like(params[:name])
    render json: players
  end
end
