import express from 'express'
import { Post } from "../models/Post.mjs"
import { sendAPI } from '../db/dbHelper.mjs'

const router = express.Router()

router.use(express.json())

// route for a specific post using id
router.get('/cat/id/:id', async (req, res) => {
    await sendAPI(res, Post, { id : req.params.id })
})
// route for all posts
router.get('/cat/all/', async (req, res)=>{
    await sendAPI(res, Post, {})
})

export default router

