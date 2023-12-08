import { API_URL } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

function useAbortLaunch() {
  const queryClient = useQueryClient()

  const {
    mutate: abortLaunch,
    isPending: isAbortingLaunch,
    error,
  } = useMutation({
    mutationKey: ['Abort-Launch'],
    mutationFn: async (id: number) => {
      const res = await axios.delete(`${API_URL}/launches/${id}`)
      const deletedLaunch = res.data
      return deletedLaunch
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Get-Launches'] })
    },
  })

  if (isAxiosError(error)) {
    console.error(error.message)
  }

  return { abortLaunch, isAbortingLaunch }
}

export { useAbortLaunch }
