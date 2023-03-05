/**
 * Route for google authentication
 * @author Kelsey Pereira Costa
 */
import express from "express"
import { DBHelper } from '../db/dbHelper.mjs'
import { User } from '../models/User.mjs'
const db = new DBHelper()

const {OAuth2Client} = require('google-auth-library');

const dotenv = require('dotenv')
dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()
const session = require('express-session');

router.use(express.json())

router.post("/", async (req, res) => {
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
  })
    if (!ticket) 
        return res.sendStatus(401)
    const { name, email, picture } = ticket.getPayload()

    //TODO add picture data
    await db.insertToDB(res, User, {name: name, email: email})

    req.session.regenerate((err) => {
        if (err) {
            return res.sendStatus(500)
        }
        req.session.user = email // user is a var used when the database portion is implemented
        res.json({user: email})
    })

})

router.use(session({
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: { 
    maxAge: 120000,
    secure: secure, 
    httpOnly: true,
    sameSite: 'strict'
  }
}))

export default router