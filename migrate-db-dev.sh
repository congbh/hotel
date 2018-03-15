#!/bin/bash
docker-compose run api-gateway knex migrate:latest --env development --knexfile knexfile.js