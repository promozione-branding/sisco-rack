import mongoose from "mongoose"


export default async function db() {
  mongoose.connect(process.env.MONGODB_URI)
  console.log("Mongo db connected")
}