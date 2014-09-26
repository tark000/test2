require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
=begin
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "active_resource/railtie"
require "sprockets/railtie"
=end
require 'rails/all'
# require "rails/test_unit/railtie"

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  #Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  Bundler.require(:default, :assets, Rails.env)
end

module HouseAngular
  class Application < Rails::Application

    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable escaping HTML in JSON.
    config.active_support.escape_html_entities_in_json = true

    config.active_record.whitelist_attributes = false

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'
    config.generators.assets = false
    config.generators.helper = false
    config.generators.views = false

    #config.assets.precompile << /(^[^_\/]|\/[^_])[^\/]*$/
    #config.assets.precompile += %w( vendor/*.js jquery.js excanvas.min.js )

    config.assets.precompile += ['rails_admin/rails_admin.css', 'rails_admin/rails_admin.js', 'style.css' ]

    config.generators do |g|
      g.test_framework :rspec, fixture: true
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
      g.view_specs false
      g.helper_specs false
      g.stylesheets = false
      g.javascripts = false
      g.helper = false
    end

    config.i18n.default_locale = :ru

# Precompile additional assets
    config.assets.precompile += %w( .svg .eot .woff .ttf )

# Add the fonts path
    config.assets.paths << "#{Rails.root}/app/assets/fonts"
    config.assets.paths << "#{Rails.root}/app/assets/templates"
    config.assets.paths << Rails.root.join("vendor","assets", "fonts")
    config.assets.paths << Rails.root.join("app", "assets", "stylesheets")
    config.assets.paths << Rails.root.join("app", "assets", "javascripts")
    config.assets.paths << Rails.root.join("vendor", "assets", "stylesheets")
    config.assets.paths << Rails.root.join("vendor", "assets", "javascripts")

  end
end
