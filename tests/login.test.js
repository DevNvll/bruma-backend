const request = require("supertest");

describe('Test the authentication router', () => {
    let server = require('../src/index')
    beforeEach(function () {
    })
    afterAll(function (done) {
        server.close(done);
    })
    test('It should successfully login', () => {
        return request(server).post("/auth/authenticate").send({username: 'devnoir', password: '123456'}).then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.token).toBeDefined()
        })
    })
    test('It should fail login with user that doesn\'t exist', () => {
        return request(server).post("/auth/authenticate").send({username: 'paspalhão', password: '123456'}).then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.code).toBe('WRONG_USER')
        })
    })
    test('It should fail login with wrong password', () => {
        return request(server).post("/auth/authenticate").send({username: 'devnoir', password: 'batata'}).then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.code).toBe('WRONG_PASS')
        })
    })
})