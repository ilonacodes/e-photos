require 'active_record'
require 'yaml'

root = File.expand_path '../../..', __FILE__
config = YAML.load(File.read(File.join(root, 'config/database.yml')))[ENV['ENV']]

if ENV['DATABASE_URL'] && ENV['ENV'] == 'production'
  ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
else
  ActiveRecord::Base.establish_connection(
      adapter:  config['adapter'], # or 'postgresql' or 'sqlite3' or 'oracle_enhanced'
      host:     config['host'],
      database: config['database'],
      username: config['username'],
      password: config['password']
  )
end