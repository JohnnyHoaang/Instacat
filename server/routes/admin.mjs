import express from 'express'
import { User } from '../models/User.mjs'
const router = express.Router()

router.use(express.json())

// route to check for admin
router.post('/users', async (req, res) => {
  const email = req.body.email
  const token = req.body.token
  try {
    // Find user with email
    let user = await User.find({ email: email })
    let response = {}
    if (user[0].isAdmin) {
      const users = await User.find({})
      // User is admin and can access all users
      response = { res: users }
    } else {
      // User is not admin and cannot access all users
      response = { error: "Forbidden access" }
    }
    // Returns response of request
    res.status(201).send(response)
  } catch {
    // Internal error 
    res.status(500).send({error: "User not found"})
  }

})

export default router

