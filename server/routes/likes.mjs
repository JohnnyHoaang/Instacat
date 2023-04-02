import express from 'express';
import {Post} from '../models/Post.mjs';
import {DBHelper} from '../db/dbHelper.mjs';
import bodyParser from 'body-parser';
import {isAuthenticated} from '../utils/util.mjs';
const router = new express.Router();
const db = new DBHelper();

router.use(bodyParser.json());

// Update like count of a post
router.post('/update', isAuthenticated, async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const token = req.body.userToken;
  // Check credentials
  if (token == req.session.userToken && email == req.session.user.email) {
    try {
      const posts = await db.getQueryData(Post, {id: id});
      // Find if user liked the post
      const isLiked = posts[0].likers.find((post) => post == email);
      if (isLiked) {
        // Unlikes if user previously liked post
        await unlikePost(id, email);
        res.status(200).json({message: 'unliked!'});
      } else {
        // Likes if user has not like post
        await likePost(id, email);
        res.status(200).json({message: 'liked!'});
      }
    } catch (e) {
      res.status(500).json({error: 'Internal Error'});
    }
  } else {
    res.status(403).json({error: 'Forbidden access'});
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
