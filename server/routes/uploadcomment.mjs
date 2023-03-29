import express from 'express'
import { Post } from "../models/Post.mjs"
import { DBHelper } from '../db/dbHelper.mjs'
import bodyParser from 'body-parser'

const router = new express.Router();
const db = new DBHelper();

router.use(express.json());

router.post('/post/add', async (req, res) => {
  const postId = { id : req.body.id };
  console.log(req.body)
  const userPost = await db.getQueryData(Post, postId);
  let allComments = userPost[0]["comments"];
  allComments.push({
    username : req.body.username,
    comment : req.body.comment
  });

  await db.updateData(Post, postId, {comments: allComments});
  res.status(200).send({message: 'comment added'});
});

export default router
