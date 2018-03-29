const plugin = require('./plugin')
const ServiceController = require('./controller')
const Service = require('./service')
const ServiceRepository = require('./repository')

module.exports = {
  ServicePlugin: plugin,
  ServiceController,
  ServiceSrv: Service,
  ServiceRepository
}
