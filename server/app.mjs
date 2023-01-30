import express from 'express'
import router from './routes/all.mjs'

const app = express()

app.use(express.static('../client/build'))
app.use("/", router)


export default app