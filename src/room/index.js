const plugin = require('./plugin')
const RoomController = require('./controller')
const RoomService = require('./service')
const RoomRepository = require('./repository')

module.exports = {
  RoomPlugin: plugin,
  RoomController,
  RoomService,
  RoomRepository
}
