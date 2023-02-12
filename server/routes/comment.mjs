import express from 'express'
import { UserComment } from "../models/UserComment.mjs"
import { sendAPI, insertToDB } from '../db/dbHelper.mjs'

const router = express.Router()

router.use(express.json())

router.get('/users', async (req, res) => {
    await sendAPI(res, UserComment, {})
})

router.post('/upload', async (req, res) => {
    await insertToDB(res, UserComment, req.body)
})

export default router

