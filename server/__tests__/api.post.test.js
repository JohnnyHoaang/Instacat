import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../app.mjs'
import { Mongo } from '../db/db.mjs'

const foundValue = {result: "there is something"}
const errorValue = {error: "error"}
const noParams = [{params:"no params"}]
const noValue = []

jest.mock('../db/db.mjs')

afterEach(() => {
    jest.restoreAllMocks()
})

describe('GET /api/cat/', ()=>{
    test("404 error", async()=>{
        const resp = await request(app).get("/api/cat/wrong/route")
        expect(resp.statusCode).toBe(404)
    })
})
