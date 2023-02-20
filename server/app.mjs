import express from 'express'
import main from './routes/main.mjs'
import posts from './routes/post.mjs'
import addPost from './routes/uploadpost.mjs'
const app = express()
app.use(express.static('../client/build')) 

app.use("/api", posts)
app.use("/add", addPost)
app.use("/", main)

export default app