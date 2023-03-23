import express from 'express'
import { Post } from "../models/Post.mjs"
import { DBHelper } from '../db/dbHelper.mjs'
import bodyParser from 'body-parser'

const router = express.Router()
const db = new DBHelper()

router.use(bodyParser.json())

router.post('/post/like', async (req, res) => {
  updateLikes({ id : req.body.id }, true)
  res.status(200).send({message: "liked!"})
})
router.post('/post/unlike', async (req, res) => {
  updateLikes({ id : req.body.id }, false)
  res.status(200).send({message: "unliked!"})
})

async function updateLikes(query, isLiked) {
  let data = await db.getQueryData(Post, query)
 
  //added new if for check the likes condition
  if (data.length > 0) {
    if (isLiked) {
      data[0]["likes"] += 1
    } else {
      data[0]["likes"] -= 1
    }
    await db.updateData(Post, query, {likes: data[0]["likes"]})
  } else {
    console.log(`No data found for query: ${JSON.stringify(query)}`);
  }
}

export default router