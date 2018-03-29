const plugin = require('./plugin')
const CatalogController = require('./controller')
const CatalogService = require('./service')
const CatalogRepository = require('./repository')

module.exports = {
  CatalogPlugin: plugin,
  CatalogController,
  CatalogService,
  CatalogRepository
}
