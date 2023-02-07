import express from "express"
import * as db from "../db/db.mjs"

const mongo = new db.Mongo()
const app = express()
const port = 3000

main()

async function main() {
  await mongo.connect()
  
  let server = app.listen(port, () => console.log(`listening on http://localhost:${port}`))

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
  
  async function shutdown(){
    console.log("Shutting down");
    server.close(async () => {
      console.log("HTTP server closed.")
      await mongo.disconnect()
      process.exit();
    })
  }
}