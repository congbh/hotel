const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
const describe = lab.describe
const it = lab.it
const { Server } = require('../src/server.js')
// const Sinon = require('sinon')
// const before = lab.before
// const after = lab.after
// const repository = require('../src/libs/repository')

describe('Testing service api', () => {
  // it('should create one', async () => {
  //   const response = await Server.inject({
  //     method: 'POST',
  //     url: '/services',
  //     payload: {
  //       name: 'Service 1',
  //       catalog: {
  //         name: 'Water',
  //         note: 'Noted'
  //       },
  //       price: 10000.01,
  //       other_price: null,
  //       in_warehouse: false,
  //       in_invoice: false
  //     }
  //   })
  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.exists()
  // })

  // it('should get list', async () => {
  //   const response = await Server.inject({
  //     method: 'GET',
  //     url: '/services?filter={}&limit=10&offset=0'
  //   })
  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result.length).to.be.greaterThan(0)
  // })

  // it('should update', async () => {
  //   const response = await Server.inject({
  //     method: 'PUT',
  //     url: '/services/417d0c48-b408-419e-9f29-3c1d79066351',
  //     payload: {
  //       name: 'Service 1',
  //       catalog: {
  //         name: 'Water'
  //       },
  //       price: 10000.00,
  //       other_price: null,
  //       in_warehouse: false,
  //       in_invoice: false
  //     }
  //   })

  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.true()
  // })
})
