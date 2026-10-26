# World Ranks

A country ranking app built with React. Browse every country, sort and filter the list, and search by name, region or subregion.

**Demo:** <your-demo-url>

## Features

- List of all countries with flag, name, population, area and region
- Sort by name, population or area (km²)
- Filter by region (one at a time)
- Filter by United Nations membership and independence
- Search by name, region or subregion
- Live count of the countries shown
- Loading and error states

### Planned

- Sorted by population by default
- Filter by several regions at once
- Pagination

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- PrimeReact
- [REST Countries API v5](https://restcountries.com/docs)

## Getting started

You need Node.js 18 or newer and a free API key from https://restcountries.com/api-keys.

```bash
git clone <your-repo-url>
cd world-ranks
npm install
```

Create a `.env` file in the project root (copy `.env.example`) and add your key(The key is given following the steps of the website: https://restcountries.com):

```
REST_COUNTRIES_API_KEY=your_key_here
```

Then start the dev server:

```bash
npm run dev
```

## How the API key is kept private

The browser never calls the API directly. It calls `/api/countries`, and a server adds the `Authorization` header and forwards the request to `https://api.restcountries.com/countries/v5`.

- In development, the Vite proxy in `vite.config.ts` does this.
- In production, a serverless function at `api/countries.ts` does it. Set `REST_COUNTRIES_API_KEY` as an environment variable in your hosting dashboard.

The key is never committed. `.env` is listed in `.gitignore`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |

## Notes

- The API returns about 254 entries and pages 100 at a time, so the app makes 3 requests on load and caches the result in `sessionStorage` for an hour. The free plan allows 1,000 requests per month.
- "Independent" uses the API's `classification.sovereign` field.
