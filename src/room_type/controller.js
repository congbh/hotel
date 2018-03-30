const Boom = require('Boom')

class RoomTypeController {
  constructor ({ roomTypeService }) {
    this.roomTypeService = roomTypeService
  }

  async create (req, h) {
    try {
      let result = await this.roomTypeService.create(req.payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.roomTypeService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async get (req, h) {
    try {
      const { id } = req.params
      let service = await this.roomTypeService.get(id)
      return h.response(service).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let payload = {...req.payload, id}
      let result = await this.roomTypeService.update(payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.roomTypeService.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = RoomTypeController
