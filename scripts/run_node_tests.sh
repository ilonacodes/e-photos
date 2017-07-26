#!/usr/bin/env bash

set -e

node -v
npm -v

npm install

export DISPLAY=:99.0

sh -e /etc/init.d/xvfb start

sleep 3                             # give xvfb some time to start

npm run test-ci
