const plugin = require('./plugin')
const FloorController = require('./controller')
const FloorService = require('./service')
const FloorRepository = require('./repository')

module.exports = {
  FloorPlugin: plugin,
  FloorController,
  FloorService,
  FloorRepository
}
