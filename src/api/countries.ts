export interface Country {
  name: string
  nativeName?: string
  alpha2Code: string
  alpha3Code: string
  region: string
  subregion?: string
  capital: string | string[] | null
  flags: {
    svg?: string
    png?: string
  }
  population: number
  area?: number
  latlng?: number[]
  languages?: {
    name: string
  }[]
  currencies?: {
    name?: string
    code?: string
    symbol?: string
  }[]
  borders?: string[]
  maps?: {
    googleMaps?: string
  }
}

const COUNTRIES_URL =
  'https://countries.dev/countries?fields=name,nativeName,alpha2Code,alpha3Code,region,subregion,capital,flags,population,area,latlng,languages,currencies,borders,maps'

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(COUNTRIES_URL)

  if (!response.ok) {
    throw new Error('Could not load countries.')
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('Unexpected API response.')
  }

  return data as Country[]
}

