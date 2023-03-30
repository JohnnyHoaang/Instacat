import express from 'express'
import fileUpload from 'express-fileupload';
import { Post } from "../models/Post.mjs"
import { DBHelper } from '../db/dbHelper.mjs'

const router = new express.Router();
const db = new DBHelper();

router.use(express.json());
router.use(
  fileUpload({
    createParentPath: true,
  }),
);

router.post('/post/add', async (req, res) => {
  const postId = { id : req.body.id };
  const userPost = {
    username : req.body.username,
    comment : req.body.comment
  }
  await db.updateData(Post, postId, { $push: { comments: userPost } });
  res.status(200).send({message: 'comment added'});
});

export default router
