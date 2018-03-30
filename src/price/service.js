const GUID = require('node-uuid')

class PriceService {
  constructor ({ priceRepository }) {
    this.repository = priceRepository
  }

  async create (payload) {
    let id = GUID.v4()
    let object = { ...payload, id }
    let result = await this.repository.create(object)
    return result
  }

  async delete (id) {
    let result = await this.repository.remove(id)
    return result
  }

  async get (id) {
    let result = await this.repository.get(id)
    return result
  }

  async update (payload) {
    let result = await this.repository.update(payload)
    return result
  }

  async list (filter = {}) {
    let result = await this.repository.list(filter)
    return result
  }
}

module.exports = PriceService
