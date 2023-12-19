type Planet = {
  kepler_name: string
  koi_disposition: 'CONFIRMED'
  koi_insol: number
  koi_prad: number
}

type Launch = {
  flightNumber: number
  mission?: string
  rocket: string
  launchDate: Date
  customers: string[]
  upcoming: boolean
  success: boolean
  destination?: string
}

type FindLaunch = {
  flightNumber: number
  mission?: string
  rocket?: string
}

type QueryParams = {
  page: number
  limit: number
}
