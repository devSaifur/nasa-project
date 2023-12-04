import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { planetsRouter } from './routes/planets/planets.router'
import { launchesRouter } from './routes/launches/launches.router'

const app = express()

app.use(
  cors({
    origin: process.env.DOMAIN_NAME,
  })
)
app.use(morgan('combined'))

app.use(express.json())
app.use(express.static('public'))

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

export default app
