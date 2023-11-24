import { createServer } from 'http'
import app from './app'

import { loadPlanetsData } from './models/planets.model'

const PORT = process.env.PORT || 4000

const server = createServer(app)

async function startServer() {
  try {
    await loadPlanetsData()
  } catch (error) {
    console.log(error)
    console.log('Failed to load planets data')
  }

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer()
