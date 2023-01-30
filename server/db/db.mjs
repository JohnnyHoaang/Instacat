import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

async function main() {
    await mongoose.connect(process.env.ATLAS_URI)
}
main()