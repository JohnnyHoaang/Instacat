import express from 'express'
import { Post } from "../models/Post.mjs"
import { DBHelper } from '../db/dbHelper.mjs'

const router = express.Router()
const db = new DBHelper()

router.use(express.json())

// route for a specific post using id
router.get('/cat/id/:id', async (req, res) => {
    const data = await db.getQueryData(Post, { id : req.params.id })
    res.json(data)
})
// route for all posts
router.get('/cat/all/', async (req, res)=>{
    const data = await db.getQueryData(Post, {})
    if(data.length > 0){
        res.json(data)
    } else {
        res.status(404).send({error:"data not found"})
    }
})

export default router

