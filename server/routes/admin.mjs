import express from 'express';
import {User} from '../models/User.mjs';
const router = express.Router();

router.use(express.json());

// Route that returns list of users if request comes from Admin
router.post('/users', async (req, res) => {
  const email = req.body.email;
  const token = req.body.token;
  if (token == req.session.token && email == req.session.user.email) {
    try {
      // Find user from session
      if (req.session.user.isAdmin) {
        const users = await User.find({});
        // User is admin and can access all users
        const response = {users};
        // Returns response of request
        res.status(201).json(response);
      }
    } catch (e) {
      // Internal error
      res.status(500).json({error: 'Internal Error'});
    }
  } else {
    // User is not allowed to request from this route
    res.status(403).json({error: 'Forbidden request'});
  }
});

router.post('/delete/user', async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const deleteEmail = req.body.deleteEmail;
  const token = req.body.token;
  if (token == req.session.token && adminEmail == req.session.user.email) {
    try {
      // Find user from session
      if (req.session.user.isAdmin) {
        await User.deleteOne({email: deleteEmail});
        // User is admin and can access all users
        const response = {status: 'Successfully delete user'};
        // Returns response of request
        res.status(201).json(response);
      }
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

