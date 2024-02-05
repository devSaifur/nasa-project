import express from 'express'
import { httpGetAllPlanets } from './planets.controller'

const planetsRouter = express.Router()

planetsRouter.get('/', httpGetAllPlanets)

export { planetsRouter }
