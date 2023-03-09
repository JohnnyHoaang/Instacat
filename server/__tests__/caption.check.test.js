import { lookForHashtags } from "../utils/captioncheck.mjs"

describe('Hashtags check', () => {
    test("Check for existing hashtags", () => {
        let caption = "this is #cool #caption"
        let hashtags = lookForHashtags(caption)
        expect(hashtags.length).toBe(2)
        expect(hashtags).toEqual(["cool", "caption"])
    })
})

describe('Hashtags check', () => {
    test("Check for non existing hashtags", () => {
        let caption = "this is #cool caption"
        let hashtags = lookForHashtags(caption)
        expect(hashtags.length).toBe(1)
        expect(hashtags).toEqual(
            expect.not.arrayContaining(["caption"]),
        );
    })
})

describe('Hashtags check', () => {
    test("Check for non existing hashtags", () => {
        let caption = "this is cool caption"
        let hashtags = lookForHashtags(caption)
        expect(hashtags.length).toBe(0)
        expect(hashtags).toEqual([])
    })
})

describe('Hashtags check', () => {
    test("Check for non existing hashtags", () => {
        let caption = ""
        let hashtags = lookForHashtags(caption)
        expect(hashtags.length).toBe(0)
        expect(hashtags).toEqual([])
    })
})

describe('Hashtags check', () => {
    test("Check for existing hashtag with empty hashtag", async () => {
        let caption = "this is cool #caption #"
        let hashtags = lookForHashtags(caption)
        expect(hashtags.length).toBe(1)
        expect(hashtags).toEqual(["caption"])
    })
})