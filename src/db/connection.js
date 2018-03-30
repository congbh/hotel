const env = process.env.NODE_ENV
const config = require('../../knexfile')[env]
module.exports = require('knex')(config)
