# config valid only for current version of Capistrano
lock "3.10.0"

set :application, "tripbase"
set :rails_env, "production"
set :node_version, "6.7.0"
set :repo_url, "git@github.com:risentveber/tripbase.git"
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'frontend/node_modules', 'db/data')
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', 'config/puma.rb')
set :puma_conf, "#{shared_path}/config/puma.rb"
