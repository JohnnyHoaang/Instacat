import express from 'express'
import fileUpload from 'express-fileupload'
import { editUserProfile } from '../db/dataUpdater.mjs'
import { User } from '../models/User.mjs'
import { Post } from '../models/Post.mjs'
const router = express.Router()

router.use(express.json());
router.use(
    fileUpload({
      createParentPath: true,
    }),
);

// route to edit user profile to db
router.post('/update', async (req, res) => {
  const email = req.body.email;
  const username = req.body.name;
  // Check if credentials match session credentials
  try {
    if (email == req.session.user.email &&
      username == req.session.user.name) {
      try {
        const image = req.files.image;
        if (username) {
          // Update user profile image and username
          await editUserProfile(email, image, username);
        } else {
          // Update user profile image
          await editUserProfile(email, image, null);
        }
        // Send updated user information with image
        sendUpdatedUser(res, req.session, email);
      } catch {
        // Update user if user does not change image
        await editUserProfile(email, null, username);
        // Send updated user information without changing image
        sendUpdatedUser(res, req.session, email);
      }
    } else {
      // User is not allowed to request from this route
      res.status(403).json({error: 'Forbidden access'});
    }
  } catch {
    // User is not logged in
    res.status(403).json({error: 'Forbidden access'});
  }
});

export default router;
/**
 * Sends backs response containing update user information
 * @param {*} res Response
 * @param {*} session Session from request
 * @param {*} email User email
 */
async function sendUpdatedUser(res, session, email) {
  const user = await User.find({email: email})[0];
  session.user = user;
  res.status(201).json(user);
}
