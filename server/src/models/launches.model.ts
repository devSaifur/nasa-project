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

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
  return Array.from(launches.values())
}

export { getAllLaunches }