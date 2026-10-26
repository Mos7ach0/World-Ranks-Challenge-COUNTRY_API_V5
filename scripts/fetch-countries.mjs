import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

const API_BASE = process.env.API_BASE ?? 'https://api.restcountries.com'
const OUT = 'public/countries.json'
const PAGE_SIZE = 100
const FIELDS = [
  'names.common', 'flag.url_svg', 'population', 'area.kilometers',
  'region', 'subregion', 'classification.sovereign', 'classification.un_member',
].join(',')

function loadKey() {
  if (process.env.REST_COUNTRIES_API_KEY) return process.env.REST_COUNTRIES_API_KEY.trim()
  if (existsSync('.env')) {
    const line = readFileSync('.env', 'utf8').split(/\r?\n/).find((l) => l.startsWith('REST_COUNTRIES_API_KEY='))
    if (line) return line.slice('REST_COUNTRIES_API_KEY='.length).trim().replace(/^["']|["']$/g, '')
  }
  return ''
}

const key = loadKey()
if (!key) {
  console.error('Falta REST_COUNTRIES_API_KEY (ponla en .env o como variable de entorno).')
  process.exit(1)
}

const all = []
for (let offset = 0; ; ) {
  const url = `${API_BASE}/countries/v5?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } })
  if (!res.ok) {
    const body = await res.text()
    console.error(`Error ${res.status} en offset ${offset}: ${body.slice(0, 200)}`)
    process.exit(1)
  }
  const { data } = await res.json()
  const objects = data?.objects ?? []
  all.push(...objects)
  console.log(`offset ${offset}: +${objects.length} (total ${all.length}/${data?.meta?.total ?? '?'})`)
  if (!data?.meta?.more || objects.length === 0) break
  offset += objects.length
}

if (all.length === 0) {
  console.error('La API no devolvio paises; no se sobrescribe el archivo.')
  process.exit(1)
}
mkdirSync('public', { recursive: true })
writeFileSync(OUT, JSON.stringify(all))
console.log(`Guardados ${all.length} paises en ${OUT}`)