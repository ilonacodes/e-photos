#!/usr/bin/env bash

set -e

# kill all sub-processes automatically when this script exits for any reason
trap "trap - SIGTERM && kill -- -$$ || true" SIGINT SIGTERM EXIT

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

mkdir -p bin
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.18.0/geckodriver-v0.18.0-linux64.tar.gz > bin/geckodriver.tar.gz
(cd bin && tar -xf geckodriver.tar.gz)
chmod a+x bin/geckodriver

export PATH="$PATH:$PWD/bin"

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
sleep 3                             # give xvfb some time to start

cd features
bundle install
bundle exec rspec
