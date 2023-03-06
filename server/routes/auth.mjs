/**
 * Route for google authentication
 * @author Kelsey Pereira Costa
 */
import express from "express"
import { DBHelper } from '../db/dbHelper.mjs'
import { User } from '../models/User.mjs'
import { OAuth2Client } from "google-auth-library"
import dotenv from 'dotenv'
import session from "express-session"

const db = new DBHelper()
dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()

// TODO replace later when users are inserted to database
const users = new Array()

router.use(express.json())

router.use(session({
    secret: process.env.SECRET,
    name: 'id',
    saveUninitialized: false,
    resave: false,
    cookie: { 
      maxAge: 120000,
      secure: false, 
      httpOnly: true,
      sameSite: 'strict'
    }
  }))  

router.post("/login", async (req, res) => {
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
  })
    if (!ticket) 
        return res.sendStatus(401)
    const { name, email, picture } = ticket.getPayload()

    //TODO insert user to the database
    const user = {"name": name, "email": email, "picture": picture}
    const existsAlready = users.findIndex(element => element.email === email)
    if (existsAlready < 0) {
      users.push(user)
    } else {
      users[existsAlready] = user
    }

    //TODO add picture data

    // await db.insertToDB(res, User, {name: name, email: email})

    req.session.regenerate((err) => {
        if (err) {
            return res.sendStatus(500)
        }
        req.session.user = user // user is a var used when the database portion is implemented
        res.json({user: user})
    })

})

router.get("/logout", isAuthenticated, () => {
  req.session.destroy(function(err) {
    if (err) {
      return res.sendStatus(500)
    }
    res.clearCookie('id')
    res.sendStatus(200)
  })
})

/**
 * Function to check if a user can access a route
 * @param {*} req Request object
 * @param {*} res Result
 * @param {*} next Next function
 * @returns 
 */
function isAuthenticated(req, res, next) {
  if (!req.session.user){
    return res.sendStatus(401); //unauthorized
  }
  next();
}

export default router