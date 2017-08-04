require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/puma'
require 'capistrano/rails/migrations'
install_plugin Capistrano::Puma

namespace :rails do
  desc 'Open a rails console `cap [staging] rails:console [server_index default: 0]`'
  task :console do
    on roles(:app) do |server|
      puts "Opening a console on: #{host}...."

      cmd = "ssh #{server.user}@#{host} -t 'cd #{fetch(:deploy_to)}/current && RAILS_ENV=#{fetch(:rails_env)} bundle exec rails console'"

      puts cmd

      exec cmd
    end
  end
end

namespace :deploy do
  desc 'Install node modules'
  task 'frontend:install' do
    on roles(:app) do
      execute "cd #{release_path}/frontend/; PATH=/root/.nvm/versions/node/v#{fetch(:node_version)}/bin:#{shared_path}/bin:$PATH npm i --silent"
    end
  end

  task 'frontend:build' do
    on roles(:app) do
      execute "cd #{release_path}/frontend/; PATH=/root/.nvm/versions/node/v#{fetch(:node_version)}/bin:#{shared_path}/bin:$PATH NODE_ENV=#{fetch(:rails_env)} npm run build"
    end
  end

  task 'apidoc:build' do
    on roles(:app) do
      execute "cd #{release_path}; PATH=/root/.nvm/versions/node/v#{fetch(:node_version)}/bin:#{shared_path}/bin:$PATH NODE_ENV=#{fetch(:rails_env)} apidoc -i app/ -o apidoc/"
    end
  end


  after :updated, 'frontend:install'
  after :updated, 'frontend:build'
  after :updated, 'apidoc:build'
end
