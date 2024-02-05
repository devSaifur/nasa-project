import { getAllPlanets } from '../../models/planets.model'
import type { Request, Response } from 'express'

export async function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(await getAllPlanets())
}
