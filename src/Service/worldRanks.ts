export interface Country {
  name: string
  flag: string
  population: number
  area: number
  region: string
  subregion: string
  independent: boolean
  unMember: boolean
}

// Forma de un pais en REST Countries v5 (solo los campos que pedimos)
interface RawCountry {
  names?: { common?: string }
  flag?: { url_svg?: string; url_png?: string }
  population?: number
  area?: { kilometers?: number }
  region?: string
  subregion?: string
  classification?: { sovereign?: boolean; un_member?: boolean }
}

interface Page {
  data?: { objects?: RawCountry[]; meta?: { total?: number; more?: boolean } }
  errors?: { message?: string }[]
}

// Las llamadas pasan por tu propio servidor (proxy de Vite en dev, funcion/backend en prod)
// para no exponer la API key en el navegador.
const BASE_URL: string = import.meta.env.VITE_COUNTRIES_API_URL ?? '/api/countries'

// Solo pedimos lo que la UI usa (v5 devuelve 90+ campos por pais)
const FIELDS = [
  'names.common',
  'flag.url_svg',
  'population',
  'area.kilometers',
  'region',
  'subregion',
  'classification.sovereign',
  'classification.un_member',
].join(',')

const PAGE_SIZE = 100 // maximo del plan gratuito (25 por defecto); planes de pago hasta 500

const CACHE_KEY = 'world-ranks:countries:v5'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hora (la API permite cachear hasta 3 dias)

const normalize = (c: RawCountry): Country => ({
  name: c.names?.common ?? 'Unknown',
  flag: c.flag?.url_svg || c.flag?.url_png || '', // la API devuelve "" (no null) si no hay bandera
  population: c.population ?? 0,
  area: c.area?.kilometers ?? 0,
  region: c.region ?? '',
  subregion: c.subregion ?? '',
  independent: c.classification?.sovereign ?? false,
  unMember: c.classification?.un_member ?? false,
})

function readCache(): Country[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { t, data } = JSON.parse(raw) as { t: number; data: Country[] }
    return Date.now() - t < CACHE_TTL_MS ? data : null
  } catch {
    return null
  }
}

function writeCache(data: Country[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }))
  } catch {
    /* sin cache, no pasa nada */
  }
}

async function fetchPage(offset: number, signal?: AbortSignal): Promise<Page> {
  const url = `${BASE_URL}?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`
  const response = await fetch(url, { signal })
  if (!response.ok) {
    let detail = ''
    try {
      detail = ((await response.json()) as Page).errors?.[0]?.message ?? ''
    } catch {
      /* cuerpo no JSON */
    }
    throw new Error(`Request failed: ${response.status} ${detail || response.statusText}`)
  }
  return response.json()
}

// Archivo generado en el deploy (public/countries.json). Si existe, no se llama a la API.
async function fetchStatic(signal?: AbortSignal): Promise<Country[] | null> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}countries.json`, { signal })
    if (!response.ok) return null
    const data: unknown = await response.json()
    return Array.isArray(data) ? (data as RawCountry[]).map(normalize) : null
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e
    return null // no existe (en dev Vite devuelve HTML) -> usamos la API
  }
}

// v5 pagina (~254 paises): pedimos paginas de 100 hasta que meta.more sea false
export async function getAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const fromFile = await fetchStatic(signal)
  if (fromFile) return fromFile

  const cached = readCache()
  if (cached) return cached

  const raw: RawCountry[] = []
  let offset = 0
  for (;;) {
    const page = await fetchPage(offset, signal)
    const objects = page.data?.objects ?? []
    raw.push(...objects)
    if (!page.data?.meta?.more || objects.length === 0) break
    offset += objects.length
  }

  const countries = raw.map(normalize)
  writeCache(countries)
  return countries
}