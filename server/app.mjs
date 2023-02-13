import express from 'express'
import main from './routes/main.mjs'
import comment from './routes/comment.mjs'
import profile from './routes/profile.mjs'
import posts from './routes/post.mjs'
import addPost from './routes/uploadpost.mjs'
const app = express()
app.use(express.static('../client/build')) 

app.use("/comment", comment)
app.use("/profile", profile)
app.use("/api", posts)
app.use("/add", addPost)
app.use("/", main)




export default app