#!/usr/bin/env bash

set -e

cd backend

mysql < scripts/init-db-on-travis.sql

bundle install

ENV=travis bundle exec rake db:migrate
ENV=travis bundle exec rake db:seed
ENV=travis bundle exec rspec
