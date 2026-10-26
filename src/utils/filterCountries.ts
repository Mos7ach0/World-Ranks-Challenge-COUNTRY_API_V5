import type { Country } from '../Service/worldRanks'
import type { TSort, TStatus } from '../Contexts/FormContext'

interface Options { name: string; region: string; status: TStatus[]; sort?: TSort }

export function filterCountries(list: Country[], { name, region, status, sort }: Options): Country[] {
  const q = name.trim().toLowerCase()
  const result = list.filter(c =>
    (!region || c.region.toLowerCase().startsWith(region.toLowerCase())) &&
    status.every(s => c[s]) &&
    (!q || [c.name, c.region, c.subregion].some(v => v.toLowerCase().includes(q)))
  )
  if (!sort) return result
  // Nombre A-Z; poblacion y area de mayor a menor (es un ranking)
  return [...result].sort((a, b) =>
    sort === 'name' ? a.name.localeCompare(b.name) : b[sort] - a[sort]
  )
}
