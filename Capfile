require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/migrations'

namespace :deploy do
  desc 'Install node modules'
  task :build_frontend do
    on roles(:app) do
      execute "cd #{release_path}/frontend/; PATH=/root/.nvm/versions/node/v#{fetch(:node_version)}/bin:#{shared_path}/bin:$PATH NODE_ENV=#{fetch(:rails_env)} NVM_DIR=/root/.nvm npm i"
      execute "cd #{release_path}/frontend/; PATH=/root/.nvm/versions/node/v#{fetch(:node_version)}/bin:#{shared_path}/bin:$PATH NODE_ENV=#{fetch(:rails_env)} NVM_DIR=/root/.nvm PUBLIC_URL=http://runbase.risentveber.ru npm run build"
    end
  end


  after :updated, :build_frontend
end
