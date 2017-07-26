require 'active_record'
require 'yaml'

ENV['ENV'] ||= 'development'

root = File.expand_path '../../..', __FILE__
config = YAML.load(File.read(File.join(root, 'config/database.yml')))[ENV['ENV']]

# Change the following to reflect your database settings
ActiveRecord::Base.establish_connection(
    adapter:  config['adapter'], # or 'postgresql' or 'sqlite3' or 'oracle_enhanced'
    host:     config['host'],
    database: config['database'],
    username: config['username'],
    password: config['password']
)