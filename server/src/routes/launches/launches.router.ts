import express from 'express'
import { launches } from '../../models/launches.model'

const launchesRouter = express.Router()

launchesRouter.get('/launches', (req, res) => {
  return res.status(200).json(Array.from(launches.values()))
})

export { launchesRouter }
