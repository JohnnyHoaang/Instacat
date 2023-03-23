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
  // await User.deleteMany({email:"jhoangbt@gmail.com"})
  // await User.deleteMany({email:"johnnyhoangbt@gmail.com"})
  // await User.deleteMany({email:"2003kelsey@gmail.com"})
  // await User.deleteMany({email:"dan.pomerantz@gmail.com"})
  // await User.deleteMany({email:"bogdivan2002@gmail.com"})
  db.updateData(User, {email:"jhoangbt@gmail.com"}, { isAdmin: true})
  // db.updateData(User, {email:"dan.pomerantz@gmail.com"}, { isAdmin: true})
  // db.updateData(User, {email:"bogdivan2002@gmail.com"}, { isAdmin: true})
  // db.updateData(User, {email:"2003kelsey@gmail.com"}, { isAdmin: true})
  console.log(await User.find({}))
  async function shutdown() {
    console.log("Shutting down");
      console.log("HTTP server closed.")
      await mongo.disconnect()
      process.exit();
  }
}