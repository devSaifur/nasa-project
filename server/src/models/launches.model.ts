import axios, { isAxiosError } from 'axios'
import { launches as launchesDB } from './launches.mongo'
import { planets as planetsDB } from './planets.mongo'

const DEFAULT_FLIGHT_NUMBER = 100
const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query'

export async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  })

  if (firstLaunch) {
    console.log('Launch data already loaded!')
    return
  } else {
    console.log('Loading launch data...')
    await populateLaunchesDB()
  }
}

export async function getAllLaunches(skip: number, limit: number) {
  try {
    const allLaunches: Launch[] = (await launchesDB
      .find({}, { _id: 0, __v: 0 })
      .sort({ flightNumber: 1 })
      .skip(skip)
      .limit(limit)
      .exec()) as Launch[]

    const sortedLaunches = allLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    })
    return sortedLaunches
  } catch (error) {
    if (error instanceof Error) console.error(error.stack)
    console.log('Something went wrong getting launches!')
  }
}

export async function scheduleNewLaunch(newLaunch: Launch) {
  try {
    const planet = await planetsDB
      .findOne({
        kepler_name: newLaunch.destination,
      })
      .exec()
    if (!planet) throw new Error('No matching planet found!')

    const latestFlightNumber = await getLatestFlightNumber()
    if (!latestFlightNumber) return
    const newFlightNumber = latestFlightNumber + 1

    const scheduledLaunch = {
      ...newLaunch,
      success: true,
      upcoming: true,
      customers: ['SpaceX', 'NASA'],
      flightNumber: newFlightNumber,
    }

    await saveLaunch(scheduledLaunch)
    return scheduledLaunch
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack)
    }
    console.log(err)
  }
}

export async function abortLaunchById(launchId: number) {
  try {
    const res = await launchesDB
      .updateOne(
        {
          flightNumber: launchId,
        },
        {
          success: false,
          upcoming: false,
        }
      )
      .exec()
    return res
  } catch (error) {
    if (error instanceof Error) console.error(error.stack)
    console.log('Something went wrong aborting launch!')
  }
}

export async function existLaunchWithId(launchId: number) {
  return await findLaunch({ flightNumber: launchId })
}

async function populateLaunchesDB() {
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    })

    const launchesDocs = response.data.docs

    launchesDocs.forEach((launchDoc: any) => {
      const payloads = launchDoc['payloads']
      const customers = payloads.flatMap((payload: { customers: [] }) => {
        return payload['customers']
      })

      const launch: Launch = {
        flightNumber: launchDoc['flight_number'],
        mission: launchDoc['name'],
        rocket: launchDoc['rocket']['name'],
        launchDate: launchDoc['date_local'],
        upcoming: launchDoc['upcoming'],
        success: launchDoc['success'],
        customers,
      }

      saveLaunch(launch)
    })
    console.log(`${launchesDocs.length} launches have been loaded`)
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message)
    }
    console.log('Something went wrong when saving launches to DB!')
  }
}

async function saveLaunch(newLaunch: Launch) {
  try {
    await launchesDB
      .findOneAndUpdate({ flightNumber: newLaunch.flightNumber }, newLaunch, {
        upsert: true,
      })
      .exec()
  } catch (error) {
    if (error instanceof Error) console.error(error.stack)
    console.log('Something went wrong saving launch!')
  }
}

async function findLaunch(filer: FindLaunch) {
  return await launchesDB.findOne(filer)
}

async function getLatestFlightNumber() {
  try {
    const latestLaunch = await launchesDB.findOne().sort('-flightNumber').exec()
    if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER

    const latestFlightNumber = latestLaunch.flightNumber
    return latestFlightNumber
  } catch (err) {
    if (err instanceof Error) console.error(err.stack)
    console.log(err)
  }
}
