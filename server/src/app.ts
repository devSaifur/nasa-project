import express from 'express'
import cors from 'cors'
import { planetsRouter } from './routes/planets.router'

const app = express()

app.use(
  cors({
    origin: process.env.DOMAIN_NAME,
  })
)
app.use(express.json())
app.use(planetsRouter)

export default app
