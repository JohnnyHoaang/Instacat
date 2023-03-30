/**
 * Route for google authentication
 * @author Kelsey Pereira Costa
 */
import express from 'express';
import {DBHelper} from '../db/dbHelper.mjs';
import {User} from '../models/User.mjs';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import session from 'express-session';
import isAuthenticated from '../utils/util.mjs';

const db = new DBHelper();
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = new express.Router();

router.use(express.json());

router.use(session({
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
}));

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
  // TODO add picture data
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

/**
 * Regenerates a session
 * @param {*} req
 * @param {*} res
 * @param {*} user
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
