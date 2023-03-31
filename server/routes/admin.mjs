import express from 'express';
import { User } from '../models/User.mjs';
import { DBHelper } from '../db/dbHelper.mjs';
const router = express.Router();
const db = new DBHelper();

router.use(express.json());

// Route that returns list of users only if request comes from an admin
router.post('/users', isAdmin, async (req, res, next) => {
  const email = req.body.email;
  const token = req.body.adminToken;
  // Check for correct credentials
  if (token == req.session.adminToken && email == req.session.user.email) {
    try {
      // Find user from session
      const users = await User.find({});
      // User is admin and can access all users
      const response = { users };
      // Returns response of request
      res.status(201).json(response);
    } catch (e) {
      // Internal error
      res.status(500).json({ error: 'Internal Error' });
    }
  } else {
    // User is not allowed to request from this route
    res.status(403).json({ error: 'Forbidden request' });
  }
});

// Route that deletes user only if request comes from an admin
router.post('/delete/user', isAdmin, async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const deleteEmail = req.body.deleteEmail;
  const adminToken = req.body.adminToken;
  // Check for correct credentials
  if (adminToken == req.session.adminToken &&
     adminEmail == req.session.user.email) {
    try {
      await User.deleteOne({email: deleteEmail});
      const response = {status: 'Successfully delete user'};
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

// Route that sets admin permission of user only if request comes from an admin
router.post('/permissions', async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const email = req.body.email;
  const token = req.body.adminToken;
  const isAdmin = req.body.isAdmin;
  // Check for correct credentials
  if (token == req.session.adminToken && adminEmail == req.session.user.email) {
    try {
      // Set User admin permissions
      db.updateData(User, {email: email}, {isAdmin: isAdmin});
      const response = {status: 'Successfully set permissions to user'};
      // Returns response of request
      res.status(201).json(response);
    } catch (e) {
      // Internal error
      res.status(500).json({error: 'Internal Error'});
    }
  } else {
    // User is not allowed to request from this route
    res.status(403).json({ error: 'Forbidden request' });
  }
});


export default router;

/**
 * Check if user is an admin 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function isAdmin(req, res, next) {
  if (req.session.admin) {
    return res.sendStatus(201); // Authorized
  }
  next();
}
