#!/usr/bin/env bash

set -e

mysql -e 'create database if not exists ephotos_test;'

cd backend

ENV=travis bundle exec rake db:migrate
ENV=travis bundle exec rake db:seed
ENV=travis bundle exec rspec
