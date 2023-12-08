import { useMutation } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { API_URL } from '@/utils/const'

function usePostLaunch() {
  const {
    mutate: addLaunch,
    isPending: isLaunching,
    isSuccess: isLaunched,
    error,
  } = useMutation({
    mutationKey: ['Add-Launch'],
    mutationFn: async (newLaunch: NewLaunch) => {
      await axios.post(`${API_URL}/launches`, newLaunch)
      console.log(newLaunch)
    },
  })

  if (isAxiosError(error)) {
    console.error(error.message)
  }

  return { addLaunch, isLaunching, isLaunched }
}

export { usePostLaunch }

export type NewLaunch = {
  mission: string
  rocket: string
  launchDate: Date | undefined
  destination: string
}
