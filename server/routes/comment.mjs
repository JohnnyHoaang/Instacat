import express from 'express'
import { sendAPI, insertDB } from '../db/dbHelper.mjs'

const router = express.Router()

router.use(express.json())

router.get('/users', async (req, res) => {
    await sendAPI(res, "test", "usercomments")
})

router.post('/upload', async (req, res) => {
    await insertDB("test", "usercomments", req.body)
})

export default router

