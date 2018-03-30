const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
const describe = lab.describe
const it = lab.it
const GUID = require('node-uuid')

const {Server} = require('../src/server.js')

describe('Testing hotel plugin', () => {
//   it('should delete', async () => {
//     const response = await Server.inject({
//       method: 'DELETE',
//       url: '/hotel/9d24470a-2fc8-4660-a4b9-cce45596b6c8'
//     })

//     expect(response.statusCode).to.equal(200)
//     expect(response.result).to.be.true()
//   })

//   it('should create hotel', async () => {
//     const response = await Server.inject({
//       method: 'POST',
//       url: '/hotel',
//       payload: {
//         name: 'AAA',
//         floor: 4,
//         room: 20,
//         address: '16 An Duong Vuong',
//         province: 'TP.Vinh',
//         phone: '09888888',
//         email: 'abc@gmail.com',
//         note: 'abc',
//         website: 'xxx',
//          created_by: GUID.v4()
//          activated: true
//       }
//     })
//     expect(response.statusCode).to.equal(200)
//     expect(response.result).to.be.exists()
//   })

//   it('should update', async () => {
//     const response = await Server.inject({
//       method: 'PUT',
//       url: '/hotel/0a560467-661e-4dae-b445-3bf4ae32cc39',
//       payload: {
//         name: 'AAA',
//         floor: 4,
//         room: 20,
//         address: '16 An Duong Vuong',
//         province: 'TP.Vinh',
//         phone: '0000',
//         email: 'abc@gmail.com',
//         note: 'xxx',
//         website: 'xxx',
//         created_by: 'a21ad118-ad8c-4c38-b637-0e665650dbcb',
//         activated: true
//       }
//     })

//     expect(response.statusCode).to.equal(200)
//     expect(response.result).to.be.true()
//   })

  // it('should get list', async () => {
  //   const response = await Server.inject({
  //     method: 'GET',
  //     url: '/hotel?limit=10&offset=0'
  //   })

  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.exists()
  // })

  // it('should get one', async () => {
  //   const response = await Server.inject({
  //     method: 'GET',
  //     url: '/hotel/0a560467-661e-4dae-b445-3bf4ae32cc39'
  //   })

  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result.created_by).to.be.equal('a21ad118-ad8c-4c38-b637-0e665650dbcb')
  // })
})
