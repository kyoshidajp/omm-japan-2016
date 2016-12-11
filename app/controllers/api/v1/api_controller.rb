class Api::V1::APIController < ActionController::Base
  before_action :check_day

  private

  def check_day
    day = params[:day]
    head(:bad_request) unless %w(1 2).include?(day)
  end
end
