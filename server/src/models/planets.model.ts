import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'
import { planets } from './planets.mongo'

export async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
}

export function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    createReadStream('./data/kepler_data.csv')
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) savePlanets(data)
      })
      .on('error', (err) => {
        console.error(err)
        reject(err)
      })
      .on('end', async () => {
        const planetsLength = (await getAllPlanets()).length
        console.log(`${planetsLength} habitable planets have been found`)
        resolve()
      })
  })
}

function isHabitablePlanet(planet: Planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}

async function savePlanets(planet: Planet) {
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      {
        upsert: true,
      }
    )
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    console.log('Something went wrong when saving planets to db!')
  }
}
