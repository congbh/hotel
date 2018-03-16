#!/bin/bash
set -e
export NODE_ENV=development
# Build app and api containers
docker-compose -f docker-compose.yml build

# Launch the db alone once and give it time to create db user and database
# This is a quickfix to avoid waiting for database to startup on first execution (more details [here](https://docs.docker.com/compose/startup-order/))
# This is a quickfix to avoid waiting for database to startup on first execution (more details [here](https://docs.docker.com/compose/startup-order/))
# docker-compose -f docker-compose.yml up
docker-compose -f docker-compose.yml up -d postgres-db
#ocker-compose -f docker-compose.yml stop postgres-db

#docker-compose run users-service knex migrate:latest --env development --knexfile app/config.js
docker-compose -f docker-compose.yml up api-gateway