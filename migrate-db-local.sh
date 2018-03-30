#!/bin/bash

# npm install knex -g
# sleep(5)
knex migrate:latest --env local --knexfile knexfile.js
knex seed:run --env local --knexfile knexfile.js