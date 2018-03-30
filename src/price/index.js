const plugin = require('./plugin')
const PriceController = require('./controller')
const PriceService = require('./service')
const PriceRepository = require('./repository')

module.exports = {
  PricePlugin: plugin,
  PriceController,
  PriceService,
  PriceRepository
}
