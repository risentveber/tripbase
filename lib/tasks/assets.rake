namespace :assets do
  desc "Build frontend"
  task precompile: :environment do
    sh 'cd frontend; /root/.nvm/versions/node/v6.7.0/bin/npm run build'
  end

end
