require('dotenv').config({silent: true})

const path = require('path')

module.exports = {
  local: {
    client: 'pg',
    // connection: 'postgresql://postgres:1234567a@@localhost:5432/hotel_dev',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '1234567a@',
      database: 'hotel_dev'
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL || 'postgres://postgres:OoMUDgwLGG@localhost:5433/hotel_test',
    // debug: true,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  }
}
