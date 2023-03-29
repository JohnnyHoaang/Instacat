/**
 * Route for google authentication
 * @author Kelsey Pereira Costa
 */
import express from 'express';
import {DBHelper} from '../db/dbHelper.mjs';
import {User} from '../models/User.mjs';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import isAuthenticated from '../utils/util.mjs';

const db = new DBHelper();
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = new express.Router();

router.use(express.json());

router.post('/login', async (req, res) => {
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  if (!ticket) {
    return res.sendStatus(401);
  };

  const {name, email, picture} = ticket.getPayload();
  // Check if user exists with email
  const user = await User.find({email: email});
  if (user.length == 0) {
    // Create new user object and insert to database
    const user = {'name': name, 'email': email, 'picture': picture};
    db.insertToDB(User, user);
    // Regenerate session with new user
    regenerateSession(req, res, user);
  } else {
    // Regenerate session with user from DB
    regenerateSession(req, res, user[0]);
  }
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      return res.sendStatus(500);
    }
    res.clearCookie('id');
    res.sendStatus(200);
  });
});

// Checks if the user is logged in and returns user information back
router.get('/isLoggedIn', (req, res) => {
  if (req.session.user) {
    res.json(
        {
          isLoggedIn: true,
          user: req.session.user,
        });
  } else {
    res.json(
        {
          isLoggedIn: false,
        });
  }
});

/**
 * Regenerates a user session
 * @param {Request} req
 * @param {Response} res
 * @param {Object} user
 */
function regenerateSession(req, res, user) {
  req.session.regenerate((err) => {
    if (err) {
      return res.sendStatus(500);
    }
    req.session.user = user;
    res.json({user: user});
  });
}

export default router;
