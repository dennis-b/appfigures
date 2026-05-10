import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useDebounce } from 'react-use'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { SEARCH_DEBOUNCE_MS } from '@/api/reviews/reviews.api.constants'
import { Route } from '@/routes/reviews'

export function useSearchInput() {
  const { q } = useSearch({ from: Route.fullPath })
  const navigate = useNavigate({ from: Route.fullPath })

  const [localValue, setLocalValue] = useState(q ?? '')
  const lastCommittedQRef = useRef<string | undefined>(q)

  // Sync localValue when URL changed externally (back/forward)
  useEffect(() => {
    if ((q ?? '') !== (lastCommittedQRef.current ?? '')) {
      lastCommittedQRef.current = q
      setLocalValue(q ?? '')
    }
  }, [q])

  useDebounce(() => {
    const newQ = localValue || undefined
    if (newQ !== q) {
      lastCommittedQRef.current = newQ
      void navigate({
        search: (prev) => ({ ...prev, q: newQ }),
      })
    }
  }, SEARCH_DEBOUNCE_MS, [localValue])

  const onClear = () => {
    lastCommittedQRef.current = undefined
    setLocalValue('')
    void navigate({ search: (prev) => ({ ...prev, q: undefined }) })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value)

  return { localValue, onChange, onClear }
}
