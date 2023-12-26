import { API_URL } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

function useGetLaunches() {
  const {
    data: launches,
    isLoading: isGettingLaunches,
    error,
  } = useQuery({
    queryKey: ['Get-Launches'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/launches`)
      const launches: Launch[] = res.data
      return launches
    },
  })

  if (isAxiosError(error)) {
    console.error(error.message)
  }

  return { launches, isGettingLaunches }
}

export { useGetLaunches }

export type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: string
  destination: string
  customers: string[]
  upcoming: boolean
  success: boolean
}
