import express from 'express';
import {User} from '../models/User.mjs';
import {DBHelper} from '../db/dbHelper.mjs';
const router = express.Router();
const db = new DBHelper();

router.use(express.json());

// Route that returns list of users only if request comes from an admin
router.post('/users', async (req, res) => {
  const email = req.body.email;
  const token = req.body.token;
  // Check for correct credentials
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

// Route that deletes user only if request comes from an admin
router.post('/delete/user', async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const deleteEmail = req.body.deleteEmail;
  const token = req.body.token;
  // Check for correct credentials
  if (token == req.session.token && adminEmail == req.session.user.email) {
    try {
      if (req.session.user.isAdmin) {
        await User.deleteOne({email: deleteEmail});
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

// Route that sets admin permission of user only if request comes from an admin
router.post('/permissions', async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const email = req.body.email;
  const token = req.body.token;
  const isAdmin = req.body.isAdmin;
  // Check for correct credentials
  if (token == req.session.token && adminEmail == req.session.user.email) {
    try {
      if (req.session.user.isAdmin) {
        // Set User admin permissions
        db.updateData(User, {email: email}, {isAdmin: isAdmin});
        const response = {status: 'Successfully set permissions to user'};
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

