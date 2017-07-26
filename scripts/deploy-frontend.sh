#!/usr/bin/env bash

set -e

npm run webpack:prod
npm run deploy-to-gh-pages
npm run webpack:dev
