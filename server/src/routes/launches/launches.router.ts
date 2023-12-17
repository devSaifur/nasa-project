import express from 'express'
import {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} from '../../models/launches.model'

const launchesRouter = express.Router()

launchesRouter.get('/', async (req, res) => {
  return res.status(200).json(await getAllLaunches())
})

launchesRouter.post('/', (req, res) => {
  const newLaunch = req.body

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.destination
  ) {
    return res.status(400).json({ error: 'Missing required launch property' })
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate)
  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch date' })
  }

  return res.status(201).json(addNewLaunch(newLaunch))
})

launchesRouter.delete('/:id', (req, res) => {
  const launchId = req.params.id

  const launchExist = existLaunchWithId(Number(launchId))
  if (!launchExist) {
    res.status(400).json({ error: 'Launch does not exist' })
  }

  const abortedLaunch = abortLaunchById(Number(launchId))
  return res.status(200).json(abortedLaunch)
})

export { launchesRouter }
