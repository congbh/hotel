const GUID = require('node-uuid')

class Service {
  constructor ({ serviceRepository }) {
    this.repository = serviceRepository
  }

  async create ({ catalog, ...rest }) {
    let id = GUID.v4()
    let object = { ...rest, id, catalog: JSON.stringify(catalog) }
    let result = await this.repository.create(object)
    return result
  }

  async delete (id) {
    let result = await this.repository.remove(id)
    return result
  }

  async getOne (id) {
    let result = await this.repository.load(id)
    return result
  }

  async update ({ catalog, ...rest }) {
    let object = { ...rest, catalog: JSON.stringify(catalog) }
    let result = await this.repository.update(object)
    return result
  }

  async list (filter = {}) {
    let result = await this.repository.list(filter)
    return result
  }
}

module.exports = Service
