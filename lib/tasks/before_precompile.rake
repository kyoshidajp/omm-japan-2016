task :build_client do
  sh "npm run webpack-build"
end

Rake::Task["assets:precompile"].enhance(%i(build_client))
