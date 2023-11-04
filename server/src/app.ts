import express from 'express'
import cors from 'cors'
import { planetsRouter } from './routes/planets.router'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())
app.use(planetsRouter)

export default app
