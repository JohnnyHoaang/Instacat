import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

async function connect() {
    await mongoose.connect(process.env.ATLAS_URI)
}

async function disconnect() {
    await mongoose.disconnect()
}

class Mongo {
    constructor() {
        if (Mongo._instance) {
          return Mongo._instance
        }
        Mongo._instance = this;    
    }
    
    async connect() {
        await mongoose.connect(process.env.ATLAS_URI)
    }
    
    async disconnect() {
        await mongoose.disconnect()
    }
}

export { Mongo }