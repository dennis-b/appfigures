import { useEffect } from 'react'
import { toast } from 'sonner'

export function useErrorToast(isError: boolean) {
  useEffect(() => {
    if (isError) {
      toast.error('Failed to load reviews')
    }
  }, [isError])
}
