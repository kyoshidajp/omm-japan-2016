module Api::V1
  class APIController < ActionController::Base
    ActionController::Parameters.action_on_unpermitted_parameters = :raise

    rescue_from(ActionController::UnpermittedParameters) do |pme|
      render json: { error: { unknown_paramters: pme.params } },
             status: :bad_request
    end

    private

    def validate_params(validate)
      activity = validate.new(params)
      render json: { error: activity.errors } unless activity.valid?
    end
  end
end
