export type Planet = {
  kepler_name: string
  koi_disposition: 'CONFIRMED'
  koi_insol: number
  koi_prad: number
}

export type Launch = {
  flightNumber: number
  mission?: string
  rocket: string
  launchDate: Date
  customers: string[]
  upcoming: boolean
  success: boolean
  destination?: string
}

export type FindLaunch = {
  flightNumber: number
  mission?: string
  rocket?: string
}

export type QueryParams = {
  page: number
  limit: number
}
