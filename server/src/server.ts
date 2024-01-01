import { createServer } from 'node:http'

import app from './app'
import { connectDB } from './services/mongo'
import { loadPlanetsData } from './models/planets.model'
import { loadLaunchesData } from './models/launches.model'

const PORT = process.env.PORT || 4000

const server = createServer(app)

async function startServer() {
  try {
    await connectDB()
    loadPlanetsData()
    loadLaunchesData()
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    console.log('Something went wrong starting server!')
  } finally {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }
}

startServer()
