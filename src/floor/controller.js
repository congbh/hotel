
const Boom = require('Boom')
const GUID = require('node-uuid')

class FloorController {
  constructor ({ floorService }) {
    this.floorService = floorService
  }

  async create (req, h) {
    try {
      let id = GUID.v4()
      let floor = {...req.payload, id}
      let result = await this.floorService.create(floor)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.floorService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async getOne (req, h) {
    try {
      const { id } = req.params
      let floor = await this.floorService.getOne(id)
      return h.response(floor).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let floor = {...req.payload, id}
      let result = await this.floorService.update(floor)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.floorService.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = FloorController
