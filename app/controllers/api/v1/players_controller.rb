module Api::V1
  class PlayersController < Api::V1::APIController
    before_action { validate_params(Validations::Player) }

    def index
      players = Player.name_like(params[:name]).page(params[:page]).per(params[:per])
      render json: { total_count: players.total_count, players: players }
    end
  end
end
