import express from 'express';
import {Post} from '../models/Post.mjs';
import {DBHelper} from '../db/dbHelper.mjs';

const router = new express.Router();
const db = new DBHelper();

router.post('/post/like', async (req, res) => {
  updateLikes({id: req.body.id}, true);
  res.status(200).send({message: 'liked!'});
});
router.post('/post/unlike', async (req, res) => {
  updateLikes({id: req.body.id}, false);
  res.status(200).send({message: 'unliked!'});
});

/**
 * TODO Write JSDocs
 * @param {*} query
 * @param {*} isLiked
 */
async function updateLikes(query, isLiked) {
  const data = await db.getQueryData(Post, query);
  if (isLiked) {
    data[0]['likes'] += 1;
  } else {
    data[0]['likes'] -= 1;
  }
  await db.updateData(Post, query, {likes: data[0]['likes']});
}

export default router;
