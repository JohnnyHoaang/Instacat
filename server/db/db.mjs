import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

// async function connect() {
//     await mongoose.connect(process.env.ATLAS_URI)
// }

// async function disconnect() {
//     await mongoose.disconnect()
// }

_instance = null
class Mongo {
    constructor() {
        if (_instance) {
          return _instance
        }
        _instance = this;    
    }
    
    async connect() {
        await mongoose.connect(process.env.ATLAS_URI)
    }
    
    async disconnect() {
        await mongoose.disconnect()
    }
}

export { Mongo }