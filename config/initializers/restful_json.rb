RestfulJson.configure do
  # we use this, and it is different from the default config
  self.debug = true
  self.can_filter_by_default_using = [:eq]
  self.filter_split = ','.freeze
  self.predicate_prefix = '!'.freeze
  self.return_resource = true
  self.actions_that_authorize = [:create, :update, :delete]
  self.use_permitters = true
  self.action_to_permitter = {create: nil, update: nil}

  #self.actions_that_permit = [:create, :update]

  # being explicit about these because we use them
  #self.use_permitters = true
  self.return_error_data = true

  #self.allow_action_specific_params_methods = true
  # being explicit about this because the version of ActiveModel::Serializers we use has had issues with respond_with
  self.avoid_respond_with = true
  #self.rescue_class = StandardError

  begin
    require 'cancan/exceptions'
    self.rescue_handlers << {exception_classes: [CanCan::AccessDenied], status: :forbidden, i18n_key: 'api.not_found'.freeze}
  rescue LoadError, NameError
  end

end