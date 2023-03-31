import express from 'express';
import fileUpload from 'express-fileupload';
import {Post} from '../models/Post.mjs';
import {DBHelper} from '../db/dbHelper.mjs';
import {isAuthenticated} from '../utils/util.mjs';

const router = new express.Router();
const db = new DBHelper();

router.use(express.json());
router.use(
    fileUpload({
      createParentPath: true,
    }),
);

router.post('/post/add', isAuthenticated, async (req, res) => {
  const postId = {id: req.body.id};
  const username = req.body.username;
  const comment = req.body.comment;
  const userToken = req.body.userToken;
  // Check for credentials
  if (userToken == req.session.userToken &&
    username == req.session.user.name) {
    const userPost = {
      username: username,
      comment: comment,
    };
    await db.updateData(Post, postId, {$push: {comments: userPost}});
    res.status(200).send({message: 'comment added'});
  } else {
    res.status(403).send({error: 'Forbidden request'});
  }
});

export default router;
