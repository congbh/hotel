#!/bin/bash
docker-compose run api-gateway knex migrate:latest --env test --knexfile knexfile.js