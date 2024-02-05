import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI as string

async function connectDB() {
  await mongoose.connect(MONGO_URI)
}

mongoose.connection.once('open', () => {
  console.log("You've successfully connected to MongoDB")
})

mongoose.connection.on('error', (error) => {
  if (error instanceof Error) console.error(error.message)
  console.log('Something went wrong when connecting to DB!')
})

export { connectDB }
