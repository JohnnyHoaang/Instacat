import express from 'express';
import {Post} from '../models/Post.mjs';
import {isAuthenticated} from '../utils/util.mjs';
const router = new express.Router();

router.use(express.json());

// route to delete post from db
router.post('/post', isAuthenticated, async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const adminToken = req.body.adminToken;
  const userToken = req.body.userToken;
  // Check if user is the user that created the post or is an admin
  if (username == req.session.username && userToken == req.session.userToken ||
    adminToken == req.session.adminToken && req.session.user.isAdmin) {
    try {
      await Post.deleteOne({id: id});
      const response = {status: 'Successfully delete post'};
      // Returns response of request
      res.status(201).json(response);
    } catch (e) {
      // Internal error
      res.status(500).json({error: 'Internal Error'});
    }
  } else {
    // User is not allowed to request from this route
    res.status(403).json({error: 'Forbidden request'});
  }
});


export default router;


