import { PathHandler } from "../utils/pathHandler.mjs"
import { jest } from '@jest/globals'

const ph = new PathHandler()
const value = [{image: "https://azure.com/dog.png"}]

jest.mock('../utils/pathHandler.mjs')

afterEach(async () => {
    jest.restoreAllMocks()
})

describe('Check if path exists in API', () => {
    test("Should return true", async () => {
        jest.spyOn(PathHandler.prototype, "fetchFromAPI").mockResolvedValue(value)
        const check = await ph.doesPathExists("", "https://azure.com/dog.png")
        expect(check).toEqual(true)
    })
})

describe('Check if path exists in API', () => {
    test("Should return false", async () => {
        jest.spyOn(PathHandler.prototype, "fetchFromAPI").mockResolvedValue(value)
        const check = await ph.doesPathExists("", "https://azure.com/cat.png")
        expect(check).toEqual(false)
    })
})

describe('Check if path exists in API', () => {
    test("Should return false", async () => {
        jest.spyOn(PathHandler.prototype, "fetchFromAPI").mockResolvedValue(value)
        const check = await ph.doesPathExists("", "")
        expect(check).toEqual(false)
    })
})

describe('Check if path exists in API', () => {
    test("Should return false", async () => {
        jest.spyOn(PathHandler.prototype, "fetchFromAPI").mockResolvedValue(value)
        const check = await ph.doesPathExists("", undefined)
        expect(check).toEqual(false)
    })
})

describe('Generate unique path', () => {
    test("Should return generated path", async () => {
        const path = "dog.png"
        const uniquePath = await ph.generateUniquePath(path)
        expect(uniquePath).toBeDefined()
        expect(uniquePath.length).toBeGreaterThan(path.length)
    })
})

describe('Fetch response from API', () => {
    test("Should return API result", async () => {
        jest.spyOn(PathHandler.prototype, "fetchFromAPI").mockResolvedValue(value)
        const response = await ph.fetchFromAPI("")
        expect(response).toEqual(value)
    })
})
