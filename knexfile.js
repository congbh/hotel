require('dotenv').config({silent: true})

const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres:OoMUDgwLGG@postgres-db:5432/hotel_dev',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL || 'postgres://postgres:OoMUDgwLGG@postgres-db:5432/hotel_test',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  }
}
