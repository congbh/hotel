const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { expect } = require('code')
// const Wreck = require('wreck')
const describe = lab.describe
const it = lab.it
const {Server} = require('../src/server.js')
const { API: { API_PATH, SECRET_KEY } } = require('../src/config')
// const before = lab.before
// const after = lab.after
// const BASE_API_URL = 'http://localhost:3000'
const JWT = require('jsonwebtoken')
describe('Testing user api', () => {
  // it('should create user', async () => {
  //   const { res, payload } = await Wreck.post(`${BASE_API_URL}/users`, {
  //     payload: {
  //       username: 'name',
  //       email: 'name@gmail.com',
  //       password: 'name'
  //     }
  //   })
  //   expect(res.statusCode).to.equal(200)
  //   expect(JSON.parse(payload.toString()).result).to.be.true()
  // })

  // it('should get a user', async () => {
  //   const { payload } = await Wreck.get(`${BASE_API_URL}/users/0788b7bf-65f6-4740-a5e4-c937187b0556`)
  //   expect(payload).to.be.exist()
  // })

  // it('should get users', async () => {
  //   const { payload } = await Wreck.get(`${BASE_API_URL}/users`)
  //   expect(JSON.parse(payload.toString()).length).to.be.greaterThan(0)
  // })

  // it('should update a user', async () => {
  //   const { res, payload } = await Wreck.put(`${BASE_API_URL}/users/0788b7bf-65f6-4740-a5e4-c937187b0556`, {
  //     payload: {
  //       fullname: 'Bach Hung Cong',
  //       mobile: '0985025889',
  //       address: '16 An Duong Vuong'
  //     }
  //   })
  //   expect(res.statusCode).to.equal(200)
  //   expect(JSON.parse(payload.toString()).result).to.be.true()
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

  // it('should authenticate user', async () => {
  //   request.post({
  //     url: `${BASE_API_URL}/users/authenticate`,
  //     json: true,
  //     formData: {
  //       email: 'aaa@gmail.com',
  //       password: 'aaa'
  //     }
  //   }, function (err, res, body) {
  //     expect(err).to.not.exist()
  //     expect(body).to.be.exist()
  //   })
  // })

  // it('should create user', async () => {
  //   const response = await Server.inject({
  //     method: 'POST',
  //     url: '/users',
  //     payload: {
  //       username: 'name',
  //       email: 'name@gmail.com',
  //       password: 'name'
  //     }
  //   })
  //   console.log(response.result)
  //   expect(response.statusCode).to.equal(200)
  //   expect(response.result).to.be.exists()
  // })
  it('should get list user', async () => {
    const token = JWT.sign({ id: 'a4f3a163-57bd-47d0-ab07-1554b6631bbd', email: 'bachhungcong@gmail.com' }, SECRET_KEY)
    // console.log(' - - - - - - token  - - - - -')
    // console.log(token)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0ZjNhMTYzLTU3YmQtNDdkMC1hYjA3LTE1NTRiNjYzMWJiZCIsImVtYWlsIjoiYmFjaGh1bmdjb25nQGdtYWlsLmNvbSIsImlhdCI6MTUyMjU5ODI4MH0.yVJ5a7r6LazBOgUaGrBwsKWCP28c2BJpTf5waR6Mmiw
    const response = await Server.inject({
      method: 'GET',
      url: API_PATH + '/users?filter={}&limit=10&offset=0',
      headers: { authorization: token }
    })
    // console.log(response.result)
    expect(response.statusCode).to.equal(200)
    expect(response.result.length).to.be.greaterThan(0)
  })

  it('should get list user', async () => {
    const token = JWT.sign({ id: 'a4f3a163-57bd-47d0-ab07-1554b6631bbd', email: 'bachhungcong@gmail.com' }, SECRET_KEY)
    // console.log(' - - - - - - token  - - - - -')
    // console.log(token)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0ZjNhMTYzLTU3YmQtNDdkMC1hYjA3LTE1NTRiNjYzMWJiZCIsImVtYWlsIjoiYmFjaGh1bmdjb25nQGdtYWlsLmNvbSIsImlhdCI6MTUyMjU5ODI4MH0.yVJ5a7r6LazBOgUaGrBwsKWCP28c2BJpTf5waR6Mmiw
    const response = await Server.inject({
      method: 'GET',
      url: API_PATH + '/users/me',
      headers: { authorization: token }
    })
    console.log(response.result)
    expect(response.statusCode).to.equal(200)
    // expect(response.result.length).to.be.greaterThan(0)
  })
  // it('should return error when create user', async () => {
  //   const response = await Server.inject({
  //     method: 'POST',
  //     url: `${API_PATH}/users`,
  //     payload: {
  //       username: 'cong'
  //     }
  //   })
  //   expect(response.statusCode).to.equal(400)
  // })
})
