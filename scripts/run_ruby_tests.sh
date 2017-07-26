#!/usr/bin/env bash

set -e

./scripts/init-db.sh

cd backend

bundle install

ENV=test bundle exec rake db:migrate
ENV=test bundle exec rake db:seed
ENV=test bundle exec rspec
