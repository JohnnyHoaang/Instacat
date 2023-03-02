import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../app.mjs'

jest.mock('../db/dbHelper.mjs')

const foundValue = [{result: "there is something"}]
const errorValue = {error: "error"}
const noValue = []

afterEach(async () => {
    jest.restoreAllMocks()
})
// Test for cat posts API
describe('GET /home', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/home")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /adopt', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/adopt")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /aboutUs', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/aboutUs")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /contact', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/contact")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /discover', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/discover")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /add/post', () => {
    test('Should respond with 200', async () => {
        const res = await request(app).get("/add/post")
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /add/post', () => {
    test('Should respond with 404', async () => {
        const res = await request(app).get("/other")
        expect(res.statusCode).toBe(404)
    })
})