import { Mongo } from './db/db.mjs'

const mongo = new Mongo()
import {User} from './models/User.mjs'
import {Post} from './models/Post.mjs'
main()

async function main() {
  await mongo.connect()

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
  //await User.deleteMany({email:"jhoangbt@gmail.com"})
  console.log(await Post.find({username: "cool_glasses"}))
  await Post.updateMany({ username: "cool_glasses"  }, { $set: { username: "hey" } });
  console.log("---------------------------------------------------")
  console.log(await Post.find({username: "username"}))
  async function shutdown() {
    console.log("Shutting down");
      console.log("HTTP server closed.")
      await mongo.disconnect()
      process.exit();
  }
}