import express from 'express'
import { Post } from "../models/Post.mjs"
import { DBHelper } from '../db/dbHelper.mjs'

const router = express.Router()
const db = new DBHelper()

router.use(express.json())

// route for a specific post using id
router.get('/cat/id/:id', async (req, res) => {
    await sendData(res, { id : req.params.id })    
})
// route for all posts
router.get('/cat/all/', async (req, res)=>{
    await sendData(res,{})
})

router.post('/cat/id/like', async (req, res) => {
    updateLikes({ id : req.body.id }, true)
    res.status(200).send({message: "liked!"})
})
router.post('/cat/id/unlike', async (req, res) => {
    updateLikes({ id : req.body.id }, false)
    res.status(200).send({message: "unliked!"})
})

// helper that sends data to api
async function sendData(res,query) {
    const data = await db.getQueryData(Post, query)
    if (data.length > 0) {
        res.json(data)
    } else {
        res.status(404).send({ error: "data not found" })
    }
}

async function updateLikes(query, isLiked) {
    let data = await db.getQueryData(Post, query)
    if (isLiked) {
        data[0]["likes"] += 1
    } else {
        data[0]["likes"] -= 1
    }
    await db.updateData(Post, query, {likes: data[0]["likes"]})
}

export default router

