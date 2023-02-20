import { generateID } from "../utils/idgenerator.mjs"

describe('Generate IDs', () => {
    test("Successfully generate ID with positive length", () => {
        const id = generateID(5)
        expect(id).toBeDefined()
        expect(id.length).toBe(5)
    })
})

describe('Generate IDs', () => {
    test("Failed generating ID with length 0", () => {
        expect(() => {
            generateID(0);
        }).toThrow();
    })
})

describe('Generate IDs', () => {
    test("Failed generating ID with negative length", () => {
        expect(() => {
            generateID(-1);
        }).toThrow();
    })
})