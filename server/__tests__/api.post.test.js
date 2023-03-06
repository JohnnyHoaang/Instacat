import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../app.mjs'
import { DBHelper } from '../db/dbHelper.mjs'

jest.mock('../db/dbHelper.mjs')

const foundValue = [{ result: "there is something" }]
const errorValue = { error: "error" }
const noValue = []

afterEach(async () => {
    jest.restoreAllMocks()
})

describe('GET /api/cat/id', () => {
    test('404 error from bad parameter', async () => {
        const res = await request(app).get("/api/cat/id/cat/please")
        expect(res.statusCode).toBe(404)
    })
})

describe('GET /api/cat/id', () => {
    test('404 error from extra parameter', async () => {
        const res = await request(app).get("/api/cat/id/1/more")
        expect(res.statusCode).toBe(404)
    })
})

describe('GET /api/cat/id', () => {
    test("Should respond with 200", async () => {
        jest.spyOn(DBHelper.prototype, "getQueryData").mockResolvedValue(foundValue)
        const resp = await request(app).get('/api/cat/id/1')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(foundValue)
    })
})

describe('GET /api/cat/id', () => {
    test("Should respond with 404", async () => {
        jest.spyOn(DBHelper.prototype, "getQueryData").mockResolvedValue(noValue)
        const resp = await request(app).get('/api/cat/id/')
        expect(resp.statusCode).toBe(404)
        expect(resp.body).toEqual(errorValue)
    })
})
