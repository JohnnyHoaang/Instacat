import { Mongo } from './db/db.mjs'

const mongo = new Mongo()
import {User} from './models/User.mjs'

main()

async function main() {
  await mongo.connect()

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
  await User.deleteMany({email:"johnnyhoangbt@gmail.com"})
  console.log(await User.find({}))
  async function shutdown() {
    console.log("Shutting down");
    server.close(async () => {
      console.log("HTTP server closed.")
      await mongo.disconnect()
      process.exit();
    })
  }
}