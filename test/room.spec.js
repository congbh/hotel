const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
const describe = lab.describe
const it = lab.it
const GUID = require('node-uuid')

const {Server} = require('../src/server.js')

describe('Testing room plugin', () => {
  // it('should delete', async () => {
  //   const response = await Server.inject({
  //     method: 'DELETE',
  //     url: '/floor/93a79b76-e110-45d4-913f-012d921259d5'
  //   })

  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.true()
  // })

  // it('should create floor', async () => {
  //   const response = await Server.inject({
  //     method: 'POST',
  //     url: '/floor',
  //     payload: {
  //       activated: false,
  //       created_by: '0d507155-ff52-4b4a-babc-b5b69f685e6b',
  //       hotel_id: 'f2a8ac89-4f73-4194-b76e-7f8069576909',
  //       line_number: 1,
  //       name: 'Tang 3'
  //     }
  //   })
  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.exists()
  // })

  // it('should get list', async () => {
  //   const response = await Server.inject({
  //     method: 'GET',
  //     url: '/room?filter={}&limit=10&offset=0'
  //   })
  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result.length).to.be.greaterThan(0)
  // })

  // it('should update', async () => {
  //   const response = await Server.inject({
  //     method: 'PUT',
  //     url: '/room/c7ad34f0-12c6-405c-ac22-3508c4a1ddc9',
  //     payload: {
  //       name: '102',
  //       floor_id: 'c1ddfd80-3c3b-406e-80a2-4d25e185a182',
  //       room_type_id: GUID.v4(),
  //       status: 'READY',
  //       note: 'updated',
  //       room_mark_id: GUID.v4()
  //     }
  //   })

  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.true()
  // })

//   it('should get one', async () => {
//     const response = await Server.inject({
//       method: 'GET',
//       url: '/floor/61857166-dd7f-46a7-a6cb-1f026ebf0e4d'
//     })

//     expect(response.statusCode).to.equal(200)
//     expect(response.result.created_by).to.be.equal('0d507155-ff52-4b4a-babc-b5b69f685e6b')
//   })
})
