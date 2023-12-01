import { createReadStream } from 'fs'
import { parse } from 'csv-parse'

let habitablePlanet: Planet[] = []

function isHabitablePlanet(planet: Planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}

function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    createReadStream('./data/kepler_data.csv')
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data)
        }
      })
      .on('error', (err) => {
        console.error(err)
        reject(err)
      })
      .on('end', () => {
        console.log(
          `${habitablePlanet.length} habitable planets have been found`
        )
        resolve()
      })
  })
}

export { habitablePlanet, loadPlanetsData }