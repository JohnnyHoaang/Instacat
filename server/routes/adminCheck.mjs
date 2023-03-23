import express from 'express'
import { User } from '../models/User.mjs'
const router = express.Router()

router.use(express.json())

// route to check for admin
router.post('/check', async (req, res) => {
    const email = req.body.email
    // Find user with email
    let user = await User.find({email: email})
    // Returns if user is admin or not
    res.status(201).send({isAdmin: user[0].isAdmin})
})

export default router

