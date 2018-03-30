const plugin = require('./plugin')
const RoomTypeController = require('./controller')
const RoomTypeService = require('./service')
const RoomTypeRepository = require('./repository')

module.exports = {
  RoomTypePlugin: plugin,
  RoomTypeController,
  RoomTypeService,
  RoomTypeRepository
}
