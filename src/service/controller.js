const Boom = require('boom')

class ServiceController {
  constructor ({ serviceSrv }) {
    this.serviceSrv = serviceSrv
  }

  async create (req, h) {
    try {
      let result = await this.serviceSrv.create(req.payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.serviceSrv.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async getOne (req, h) {
    try {
      const { id } = req.params
      let service = await this.serviceSrv.getOne(id)
      return h.response(service).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let payload = {...req.payload, id}
      let result = await this.serviceSrv.update(payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.serviceSrv.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = ServiceController
