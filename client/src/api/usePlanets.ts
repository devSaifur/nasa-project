import { API_URL } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

export function usePlanets() {
  const {
    data: planets,
    isLoading: isLoadingPlanets,
    error,
  } = useQuery({
    queryKey: ['Planets'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/planets`)
      const planets: Planet[] = res.data
      return planets
    },
  })

  if (isAxiosError(error)) {
    console.error(error.message)
  }

  return { planets, isLoadingPlanets }
}

export type Planet = {
  kepler_name: string
  koi_disposition: 'CONFIRMED'
  koi_insol: number
  koi_prad: number
}
