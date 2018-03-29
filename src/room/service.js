class RoomService {
  constructor ({ roomRepository }) {
    this.repository = roomRepository
  }

  async create (room) {
    let result = await this.repository.create(room)
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
    let room = await this.repository.load(id)
    return room
  }

  async update (room) {
    let result = await this.repository.update(room)
    return result
  }
}

module.exports = RoomService
