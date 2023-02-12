import express from 'express'
import { Posts } from "../models/Posts.mjs"
import { sendAPI } from '../db/dbHelper.mjs'

const router = express.Router()

router.use(express.json())

router.get('/cat/id/:id', async (req, res) => {
    await sendAPI(res, Posts, { id : req.params.id })
})

export default router

