import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../app.mjs'
import sum from '../utils/util.mjs'

describe('Sum function test', ()=>{
    test('Should be equal to 3', ()=>{
        let value = sum(1,2)
        expect(value).toBe(3)
    })
})

describe('GET /hello/', ()=>{
})

describe('GET /hello/', ()=>{
})

