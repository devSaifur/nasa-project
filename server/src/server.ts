import { createServer } from 'node:http'
import mongoose from 'mongoose'
import 'dotenv/config'

import app from './app'
import { loadPlanetsData } from './models/planets.model'

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI as string

const server = createServer(app)

async function startServer() {
  try {
    loadPlanetsData()
    await mongoose.connect(MONGO_URI)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    console.log('Something went wrong!')
  }

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer()

mongoose.connection.once('open', () => {
  console.log("You've successfully connected to MongoDB")
})

mongoose.connection.on('error', (error) => {
  if (error instanceof Error) console.log(error.message)
  console.log('Something went wrong!')
})
