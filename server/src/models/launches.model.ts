import { launches as launchesDB } from './launches.mongo'

const launches: Map<number, Launch> = new Map()
const launch: Launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('November 29, 2030'),
  destination: 'Kepler-442 b',
  customers: ['SpaceX', 'NASA'],
  upcoming: true,
  success: true,
}
let latestFlightNumber = 100

saveLaunch()

async function saveLaunch() {
  try {
    await launchesDB.updateOne({ flightNumber: launch.flightNumber }, launch, {
      upsert: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

async function getAllLaunches() {
  try {
    const allLaunches: Launch[] = await launchesDB.find({}, { _id: 0, __v: 0 })
    const sortedLaunches = allLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    })
    return sortedLaunches
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    console.log('Something went wrong getting launches!')
  }
}

function addNewLaunch(newLaunch: Launch) {
  latestFlightNumber++

  launches.set(latestFlightNumber, {
    ...newLaunch,
    customers: ['SpaceX', 'NASA'],
    flightNumber: latestFlightNumber,
    success: true,
    upcoming: true,
  })

  return newLaunch
}

function existLaunchWithId(launchId: number) {
  return launches.has(launchId)
}

function abortLaunchById(launchId: number) {
  const abortedLaunch = launches.get(launchId)

  if (abortedLaunch) {
    abortedLaunch.success = false
    abortedLaunch.upcoming = false
  }

  return abortedLaunch
}

export { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchById }
