#!/usr/bin/env bash

set -e

cd backend

./scripts/init-db.sh

bundle install

ENV=test bundle exec rake db:migrate
ENV=test bundle exec rake db:seed
ENV=test bundle exec rspec
