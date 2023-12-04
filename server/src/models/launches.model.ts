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

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
  const allLaunches = Array.from(launches.values())

  const sortedLaunches = allLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })

  return sortedLaunches
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
