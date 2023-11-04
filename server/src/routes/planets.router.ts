import express from 'express'
import { habitablePlanet } from '../models/planets.model'

const planetsRouter = express.Router()

planetsRouter.get('/planets', (req, res) => {
  return res.status(200).json(habitablePlanet)
})

export { planetsRouter }
