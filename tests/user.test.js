const test = require('supertest')

const app = require('../src/app')

test('should signup a new user', async() => {
  await request(app).post('/users').send({
    name:'raj',
    email: 'raj@123.com',
    password: 'raj123123123'
  }).expect(201)
})
