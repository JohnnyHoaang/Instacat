import express from 'express'

const router = express.Router()

router.use(express.json())

router.get('/hello', async (req, res) => {
    try {
        res.json({ response: "Hello World" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "server error" })
    }
})

router.use((req, res) => res.status(404).json({ error: "error" }))

export default router

