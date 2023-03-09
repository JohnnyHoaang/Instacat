import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../app.mjs'
import { DBHelper } from '../db/dbHelper.mjs'

const foundValue = [{ result: "there is something" }]
const errorValue = { error: "data not found" }
const noValue = []

jest.mock('../db/dbHelper.mjs')

afterEach(async () => {
    jest.restoreAllMocks()
})

describe('GET /api/cat/', () => {
    test("404 error with wrong route", async () => {
        const resp = await request(app).get("/api/cat/wrong/route")
        expect(resp.statusCode).toBe(404)
    })
})

describe('GET /api/cat/', () => {
    test("404 error with extra param", async () => {
        const resp = await request(app).get("/api/cat/all/1")
        expect(resp.statusCode).toBe(404)
    })
})

describe('GET /api/cat/', () => {
    test("Should respond with 200", async () => {
        jest.spyOn(DBHelper.prototype, "getQueryData").mockResolvedValue(foundValue)
        const resp = await request(app).get('/api/cat/all')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(foundValue)
    })
})

describe('GET /api/cat/', () => {
    test("Should respond with 404", async () => {
        jest.spyOn(DBHelper.prototype, "getQueryData").mockResolvedValue(noValue)
        const resp = await request(app).get('/api/cat/all')
        expect(resp.statusCode).toBe(404)
        expect(resp.body).toEqual(errorValue)
    })
})