import request from 'supertest'
import app from '../app.mjs'



describe('POST /add/post/upload', () => {
    test("Save successfully", async () => {
        let payload = {
            body: { caption: "this is just a test to see"},
        }
        const resp = await request(app).post("/add/post/upload")
                                       .send(payload)
        expect(resp.statusCode).toBe(201)
    })
})
