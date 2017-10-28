class Api::ConfirmationsController < ApplicationController
  skip_before_action :authentificate, only: :verify

  def verify
    user = User.where(confirmation_hash: params[:hash]).first
    if user
      user.update_attribute :confirmed, true
      render nothing: true, status: :ok
    else
      render nothing: true, status: :not_found
    end
  end
end