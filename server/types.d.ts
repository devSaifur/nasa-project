type Planet = {
  kepler_name: string
  koi_disposition: 'CONFIRMED'
  koi_insol: number
  koi_prad: number
}

type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: string
  destination: string
  customers: string[]
  upcoming: boolean
  success: boolean
}
