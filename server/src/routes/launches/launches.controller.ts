import {
  abortLaunchById,
  existLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
} from '../../models/launches.model'
import { getPagination } from '../../services/query'
import type { Request, Response } from 'express'

export async function httpGetAllLaunches(req: Request, res: Response) {
  const { limit, skip } = getPagination(req.query as any)
  const allLaunches = await getAllLaunches(skip, limit)

  return res.status(200).json(allLaunches)
}

export async function httpAddNewLaunch(req: Request, res: Response) {
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
}

export async function httpAbortLaunch(req: Request, res: Response) {
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
}
