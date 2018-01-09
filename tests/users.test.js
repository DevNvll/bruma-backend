const request = require("supertest");

const testCredentials = {
  username: 'devnoir',
  password: '123456'
}

describe('Test the users router', () => {
    let server = require('../src/index')
    let token;
    beforeAll(function (done) {
      request(server).post("/auth/authenticate").send(testCredentials).then(response => {
        token = response.body.token
        done()
      })
    })
    afterAll(function (done) {
        server.close(done);
    })
    test('It should return the users list', () => {
        return request(server).get("/users").send({token: token}).then(response => {
          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body)).toBe(true)
        })
    })
    test('It should return the user profile', () => {
      return request(server).get("/users/me").send({token: token}).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.username).toBe(testCredentials.username)
      })
  })
})