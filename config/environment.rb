# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
HouseAngular::Application.initialize!


# support CanCan in all models
ActiveRecord::Base.send(:include, CanCan::ModelAdditions)

# support StrongParameters in all models
ActiveRecord::Base.send(:include, ActiveModel::ForbiddenAttributesProtection)
ActionController::Base.send :include, ActionController::Permittance