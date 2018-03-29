const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
module.exports = require('knex')(config)

// module.exports.TABLES = {
//   USER: 'users',
//   HOTEL: 'hotel',
//   FLOOR: 'floor',
//   ROOM: 'room',
//   SERVICE: 'service',
//   CATALOG: 'service_catalog'
// }
