import express from 'express';
import { Post } from '../models/Post.mjs';
import { DBHelper } from '../db/dbHelper.mjs';
import bodyParser from 'body-parser';

const router = new express.Router();
const db = new DBHelper();

router.use(bodyParser.json());

// Update like count of a post
router.post('/update', async (req, res) => {
  const username = req.body.username;
  const id = req.body.id;
  try {
    const posts = await db.getQueryData(Post, {id: id});
    // Find if user liked the post
    const isLiked = posts[0].likers.find((post) => post == username);
    if (isLiked) {
      // Unlikes if user previously liked post
      await unlikePost(id, username);
      res.status(200).send({message: 'unliked!'});
    } else {
      // Likes if user has not like post
      await likePost(id, username);
      res.status(200).send({message: 'liked!'});
    }
  } catch (e) {
    res.status(500).json({error: 'Internal Error'});
  }
});

// Check if user liked post
router.post('/by/user', async (req, res) => {
  const username = req.body.username;
  const id = req.body.id;
  try {
    const posts = await db.getQueryData(Post, {id: id});
    // Find if user liked the post
    const isLiked = posts[0].likers.find((post) => post == username);
    if (isLiked) {
      // User liked the post
      res.status(200).send({isLiked: true});
    } else {
      // User did not like the post
      res.status(200).send({isLiked: false});
    }
  } catch (e) {
    res.status(500).send({error: 'Internal Error'});
  }
});

export default router;
/**
 * Removes username to likers list and increments like count of a post
 * @param {String} id
 * @param {String} username
 */
async function unlikePost(id, username) {
  await Post.findOneAndUpdate({id: id}, {
    $pullAll: {
      likers: [username],
    },
    $inc: {
      likes: -1,
    },
  });
}
/**
 * Adds username to likers list and increments like count of a post
 * @param {String} id
 * @param {String} username
 */
async function likePost(id, username) {
  await Post.findOneAndUpdate({id: id}, {
    $push: {
      likers: username,
    },
    $inc: {
      likes: 1,
    },
  },
  );
}
