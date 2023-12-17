import express from 'express'
import { getAllPlanets } from '../../models/planets.model'

const planetsRouter = express.Router()

planetsRouter.get('/', async (req, res) => {
  return res.status(200).json(await getAllPlanets())
})

export { planetsRouter }
