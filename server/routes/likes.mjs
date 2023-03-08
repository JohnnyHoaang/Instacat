import express from 'express'
import { updateLikes } from "../db/dataHandler.mjs"
import { DBHelper } from '../db/dbHelper.mjs'

const router = express.Router()
const db = new DBHelper()

router.post('/post/like', async (req, res) => {
  updateLikes({ id : req.body.id }, true)
  res.status(200).send({message: "liked!"})
})
router.post('/post/unlike', async (req, res) => {
  updateLikes({ id : req.body.id }, false)
  res.status(200).send({message: "unliked!"})
})

export default router
