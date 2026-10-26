export interface Weather {
  temperature: number
  windSpeed: number
  description: string
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    wind_speed_10m: number
    weather_code: number
  }
}

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Klart väder'
  if (code === 1) return 'Mestadels klart'
  if (code === 2) return 'Delvis molnigt'
  if (code === 3) return 'Mulet'
  if ([45, 48].includes(code)) return 'Dimma'
  if ([51, 53, 55].includes(code)) return 'Duggregn'
  if ([61, 63, 65].includes(code)) return 'Regn'
  if ([71, 73, 75].includes(code)) return 'Snöfall'
  if ([80, 81, 82].includes(code)) return 'Regnskurar'
  if ([95, 96, 99].includes(code)) return 'Åska'

  return 'Okänt väder'
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code` +
    `&timezone=auto`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load weather.')
  }

  const data: OpenMeteoResponse = await response.json()

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    description: getWeatherDescription(data.current.weather_code),
  }
}