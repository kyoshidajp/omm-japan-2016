Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.precompile += %w( webpack/app )
Rails.application.config.assets.precompile += [/^[-_a-zA-Z0-9]*\..*/]
