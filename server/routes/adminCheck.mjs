import express from 'express'
import { User } from '../models/User.mjs'
const router = express.Router()

router.use(express.json())

// route to check for admin
router.post('/check', async (req, res) => {
    const email = req.body.email
    let user = await User.find({email: email})
    let response = {}
    // if(user.isAdmin == true){
    //     response = { isAdmin: true }
    // } else {
    //     response = { isAdmin: false }
    // }
    res.status(201).send({isAdmin: user[0]})
})

export default router

