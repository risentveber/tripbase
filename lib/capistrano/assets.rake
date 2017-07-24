namespace :assets do
  desc "Build frontend"
  task :precompile do
    sh 'cd frontend/ && npm install --prune && npm run build'
  end
end
