const Boom = require('Boom')

class PriceController {
  constructor ({ priceService }) {
    this.priceService = priceService
  }

  async create (req, h) {
    try {
      let result = await this.priceService.create(req.payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.priceService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async get (req, h) {
    try {
      const { id } = req.params
      let service = await this.priceService.get(id)
      return h.response(service).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let payload = {...req.payload, id}
      let result = await this.priceService.update(payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.priceService.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = PriceController
