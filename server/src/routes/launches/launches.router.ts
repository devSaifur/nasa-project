import express from 'express'
import {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} from '../../models/launches.model'

const launchesRouter = express.Router()

launchesRouter.get('/', async (req, res) => {
  return res.status(200).json(await getAllLaunches())
})

launchesRouter.post('/', async (req, res) => {
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

  return res.status(201).json(await scheduleNewLaunch(newLaunch))
})

launchesRouter.delete('/:id', async (req, res) => {
  const launchId = req.params.id

  const launchExist = existLaunchWithId(Number(launchId))
  if (!launchExist) {
    res.status(400).json({ error: 'Launch does not exist' })
  }

  try {
    const abortRes = await abortLaunchById(Number(launchId))
    if (abortRes?.acknowledged) {
      return res.status(200).json({ ok: true })
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message })
    }
    console.log(err)
  }
})

export { launchesRouter }
