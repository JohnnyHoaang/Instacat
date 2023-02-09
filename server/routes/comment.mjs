import express from 'express'
import { sendAPI, insertToDB } from '../db/dbHelper.mjs'

const router = express.Router()

router.use(express.json())

router.get('/users', async (req, res) => {
    await sendAPI(res, "usercomments")
})

router.post('/upload', async (req, res) => {
    await insertToDB(res, req.body, "usercomments")
})

export default router

