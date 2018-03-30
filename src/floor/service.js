class FloorService {
  constructor ({ floorRepository }) {
    this.repository = floorRepository
  }

  async create (floor) {
    let result = await this.repository.create(floor)
    return result
  }

  async delete (id) {
    let result = await this.repository.del(id)
    return result
  }

  async list (filter = {}) {
    let result = await this.repository.list(filter)
    return result
  }

  async getOne (id) {
    let floor = await this.repository.load(id)
    return floor
  }

  async update (floor) {
    let result = await this.repository.update(floor)
    return result
  }
}

module.exports = FloorService
