import express from 'express'
import main from './routes/main.mjs'
import posts from './routes/post.mjs'
import likes from './routes/likes.mjs'
import addPost from './routes/uploadpost.mjs'
import auth from './routes/auth.mjs'
import admin from './routes/adminCheck.mjs'
const app = express()
app.use(express.static('../client/build'))

app.use("/api", posts)
app.use("/add", addPost)
app.use("/auth", auth)
app.use("/update", likes)
app.use("/admin", admin)
app.use("/", main)

export default app;
