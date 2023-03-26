import express from 'express'
import session from 'express-session';
import MongoStore from 'connect-mongo'
import main from './routes/main.mjs'
import posts from './routes/post.mjs'
import likes from './routes/likes.mjs'
import addPost from './routes/uploadpost.mjs'
import auth from './routes/auth.mjs'
import admin from './routes/admin.mjs'
import editProfile from './routes/uploadprofile.mjs'
const app = express()
const sessionStore = MongoStore.create({mongoUrl: process.env.ATLAS_URI});
app.use(express.static('../client/build'))

app.use(session({
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
    store: sessionStore
}));

app.use("/api", posts)
app.use("/add", addPost)
app.use("/auth", auth)
app.use("/update", likes)
app.use("/edit/profile", editProfile)
app.use("/admin", admin)
app.use("/", main)

export default app;
