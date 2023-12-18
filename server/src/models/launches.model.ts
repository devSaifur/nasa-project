import { launches as launchesDB } from './launches.mongo'
import { planets } from './planets.mongo'

const DEFAULT_FLIGHT_NUMBER = 100

export async function getAllLaunches() {
  try {
    const allLaunches: Launch[] = await launchesDB.find({}, { _id: 0, __v: 0 })
    const sortedLaunches = allLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    })
    return sortedLaunches
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    console.log('Something went wrong getting launches!')
  }
}

export async function scheduleNewLaunch(newLaunch: Launch) {
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
}

export async function abortLaunchById(launchId: number) {
  try {
    const res = await launchesDB.updateOne(
      {
        flightNumber: launchId,
      },
      {
        success: false,
        upcoming: false,
      }
    )
    return res
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    console.log('Something went wrong aborting launch!')
  }
}

export async function existLaunchWithId(launchId: number) {
  return await launchesDB.findOne({ flightNumber: launchId })
}

async function saveLaunch(newLaunch: Launch) {
  try {
    const planet = await planets.findOne({ kepler_name: newLaunch.destination })
    if (!planet) throw new Error('No matching planet found!')

    await launchesDB.findOneAndUpdate(
      { flightNumber: newLaunch.flightNumber },
      newLaunch,
      {
        upsert: true,
      }
    )
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    console.log('Something went wrong saving launch!')
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort('-flightNumber')
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER

  const latestFlightNumber = latestLaunch.flightNumber
  return latestFlightNumber
}
