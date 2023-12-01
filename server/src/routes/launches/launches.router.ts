import express from 'express'
import { getAllLaunches } from '../../models/launches.model'

const launchesRouter = express.Router()

launchesRouter.get('/launches', (req, res) => {
  return res.status(200).json(getAllLaunches())
})

export { launchesRouter }
