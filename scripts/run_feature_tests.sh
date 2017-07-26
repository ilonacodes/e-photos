#!/usr/bin/env bash

set -e

# kill all sub-processes automatically when this script exits for any reason
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

export ENV=${CUSTOM_ENV:-travis}

# start frontend app
cd public
python -m SimpleHTTPServer &
sleep 3
cd ..

# setup & start backend app
cd backend

mysql < scripts/init-db-on-travis.sql

bundle install

bundle exec rake db:migrate
bundle exec rake db:seed

bundle exec ruby lib/app.rb &
sleep 3

cd ..

# setup and run feature tests
cd features
bundle install
bundle exec rspec
