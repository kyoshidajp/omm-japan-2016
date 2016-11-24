require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module OmmResult
  class Application < Rails::Application
  end
end
