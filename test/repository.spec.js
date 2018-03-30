const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
const describe = lab.describe
const it = lab.it
const before = lab.before
// const after = lab.after
const { TABLES } = require('../src/db/connection')
const Repository = require('../src/libs/repository')
// const GUID = require('node-uuid')
describe('Testing repository function', () => {
//   const config = {
//     client: 'pg',
//     debug: true,
//     connection: 'postgres://postgres:OoMUDgwLGG@localhost:5433/hotel_test'
//   }
//   const db = require('knex')(config)
//   let repository = null
//   before(() => {
//     repository = new Repository(db, TABLES.USER)
//   })
//   it('should find or', async () => {
//     let users = await repository.findOr({
//       email: null,
//       username: 'congbh'
//     })
//     expect(users).to.be.exist()
//     expect(users.length).to.be.exist()
//   })
//   it('should count', async () => {
//     let count = await repository.count('id')
//     expect(count).to.be.number()
//   })

//   it('should get list', async () => {
//     let count = await repository.list()
//     expect(count.length).to.be.greaterThan(0)
//   })
//   it('should work with limit and offset', async () => {
//     let count = await repository.list(null, 1, 0)
//     expect(count.length).to.be.equal(1)
//   })
//   it('should get one', async () => {
//     let obj = await repository.load('a21ad118-ad8c-4c38-b637-0e665650dbcb')
//     expect(obj).to.be.exist()
//     expect(obj.email).to.be.equal('bachhungcong@gmail.com')
//   })

//   it('should create one', async () => {
//     const repository = new Repository(db, TABLES.USER)
//     let obj = await repository.create({
//       id: GUID.v4(),
//       username: 'bachhungcong',
//       password: '$2a$10$eEIZ8HvQnyonVmI4oYa95.G9q3CdemsDN7rxhkF1IOM4wSjra34qi',
//       email: 'congco@gmail.com',
//       reset_token: null,
//       reset_expiry: null,
//       fullname: null,
//       address: null,
//       mobile: null,
//       activated: false
//     })
//     expect(obj).to.be.exist()
//     expect(obj.email).to.be.equal('congco@gmail.com')
//   })

//   it('should update one', async () => {
//     let updated = await repository.update({
//       id: '608c9052-23a2-4dc8-b55b-8e6b30328dbb',
//       fullname: 'Bach Hung Cong',
//       address: 'aaaa',
//       mobile: 'bbbb',
//       activated: true
//     })
//     expect(updated).to.be.true()
//     let e = await repository.load('608c9052-23a2-4dc8-b55b-8e6b30328dbb')
//     expect(e.address).to.be.equal('aaaa')
//   })

//   it('should delete one', async () => {
//     const repository = new Repository(db, TABLES.USER)
//     let deleted = await repository.delete('dac1d274-6926-4ec2-9c89-378dc42ddb11')
//     expect(deleted).to.be.true()
//   })
})
