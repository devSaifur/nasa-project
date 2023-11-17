import { createServer } from 'http'
import app from './app'

import { loadPlanetsData } from './models/planets.model'

const PORT = process.env.PORT || 4000

const server = createServer(app)

async function startServer() {
  await loadPlanetsData()

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer()
