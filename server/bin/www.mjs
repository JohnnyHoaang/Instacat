import express from "express"
import Mongo from "../db/db.mjs"

const app = express()

app.listen(3000, () => console.log('listening on port http://localhost:3000'));

process.on('SIGTERM', () => {
    server.close(async () => {
      await Mongo.disconnect()
      process.exit(0)
    });
  });