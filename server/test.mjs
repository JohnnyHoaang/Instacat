import { Mongo } from './db/db.mjs'
import { DBHelper } from './db/dbHelper.mjs'
const mongo = new Mongo()
import {User} from './models/User.mjs'

const db = new DBHelper()

main()

async function main() {
  await mongo.connect()

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
  console.log(await User.find({}))
  async function shutdown() {
    console.log("Shutting down");
      console.log("HTTP server closed.")
      await mongo.disconnect()
      process.exit();
  }
}