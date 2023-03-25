import express from 'express'
import fileUpload from 'express-fileupload'
import { saveToAzure } from '../db/azure.mjs'
import { editUserProfile } from '../db/dataUpdater.mjs'
import { User } from '../models/User.mjs'
const router = express.Router()

router.use(express.json())
router.use(
  fileUpload({
    createParentPath: true,
  })
);

// route to edit user profile to db
router.post('/update', async (req, res) => {
  const email = req.body.email
  const username = req.body.username
  try {
    const image = req.files.image
    if (username) {
      // Update user profile image and username
      await editUserProfile(email, image, username)
    } else {
      // Update user profile image
      await editUserProfile(email, image, null)
    }
    // Send updated user information with image
    sendUpdatedUser(res, email)
  } catch {
    // Update user if user does not change image
    await editUserProfile(email, null, username)
    // Send updated user information without changing image
    sendUpdatedUser(res, email)
  }
})

export default router

async function sendUpdatedUser(res, email) {
  const user = await User.find({ email: email })
  res.status(201).send(user[0])
}