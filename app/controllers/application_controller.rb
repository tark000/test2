class ApplicationController < ActionController::Base
  before_filter :configure_permitted_parameters, if: :devise_controller?
  #serialization_scope :current_user
  #serialization_scope :current_user, except: [:index, :show]
  before_filter :authenticate_user!, :except => [:index, :show]
  skip_before_filter :verify_authenticity_token

  def admin?
    true
  end

  helper_method :admin?

  private

  def current_ability
    @current_ability ||= Ability.new(current_user)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password, :password_confirmation) }
  end

  def set_encoding
    Encoding.default_external = 'UTF-8'
  end
end
