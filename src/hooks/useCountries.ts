import { useEffect, useState } from 'react'
import { getAllCountries, type Country } from '../Service/worldRanks'

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    getAllCountries(controller.signal)
      .then(setCountries)
      .catch((e: Error) => {
        if (e.name !== 'AbortError') setError(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  return { countries, loading, error }
}
