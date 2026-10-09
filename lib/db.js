import mongoose from "mongoose"

const cache = global._mongo || (global._mongo = {})

export default async function db() {
  cache.promise ||= mongoose.connect(process.env.MONGODB_URI)
  await cache.promise
}