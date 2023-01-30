import express from 'express'
import router from './routes/all.mjs'

const app = express()
app.use("/", router)
app.use(express.static('../client/build'))

export default app