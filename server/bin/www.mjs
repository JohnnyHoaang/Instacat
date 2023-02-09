import app from '../app.mjs'
import { Mongo } from '../db/db.mjs' 

const PORT = 3000
const mongo = new Mongo()

main()

async function main() {
  await mongo.connect()

  let server = app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
  })

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