const plugin = require('./plugin')
const UserController = require('./controller')
const UserService = require('./service')
const UserRepository = require('./repository')

module.exports = {
  UserPlugin: plugin,
  UserController,
  UserService,
  UserRepository
}
