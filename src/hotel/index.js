const plugin = require('./plugin')
const HotelController = require('./controller')
const HotelService = require('./service')
const HotelRepository = require('./repository')

module.exports = {
  HotelPlugin: plugin,
  HotelController,
  HotelService,
  HotelRepository
}
