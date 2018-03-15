const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
const Boom = require('Boom')
// const Server = require('../src/server.js')
// const knex = require('../src/db/connection')
var request = require('request')

const describe = lab.describe
const it = lab.it
// const before = lab.before
// const after = lab.after
const BASE_API_URL = 'http://localhost:3000'
describe('Testing user api', () => {
  // it('should create user', async () => {
  //   request.post({
  //     url: 'http://localhost:3000/users',
  //     formData: {
  //       username: 'aaa',
  //       email: 'aaa@gmail.com',
  //       password: 'aaa'
  //     }
  //   }, function (err, res) {
  //     expect(err).to.not.exist()
  //     expect(res.statusCode).to.equal(200)
  //   })
  // })

  // it('should check unique user', async () => {
  //   request.post({
  //     url: `${BASE_API_URL}/users`,
  //     json: true,
  //     formData: {
  //       username: 'aaa',
  //       email: 'aaa@gmail.com',
  //       password: 'aaa'
  //     }
  //   }, function (err, res, body) {
  //     expect(body.statusCode).to.equal(422)
  //     expect(body.error).to.be.exist()
  //   })
  // })

  it('should authenticate user', async () => {
    request.post({
      url: `${BASE_API_URL}/users/authenticate`,
      json: true,
      formData: {
        email: 'aaa@gmail.com',
        password: 'aaa'
      }
    }, function (err, res, body) {
      expect(err).to.not.exist()
      expect(body).to.be.exist()
    })
  })
})
