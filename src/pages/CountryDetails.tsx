import { Link, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCountries } from '../api/countries'
import type { Country } from '../api/countries'
import { getWeather } from '../api/weather'
import { getWikipediaInfo } from '../api/wikipedia'
import './CountryDetails.css'

function CountryDetails() {
const { code } = useParams<{ code: string }>()
const location = useLocation()

const {
data: countries = [],
isLoading,
isError,
} = useQuery({
queryKey: ['countries'],
queryFn: getCountries,
staleTime: 1000 * 60 * 60,
})

if (isLoading) {
return <p className="details-status">Loading country...</p>
}

if (isError) {
return ( <main className="details-page"> <p className="details-status">
Could not load country information. </p>
<Link className="back-link" to={`/${location.search}`}>
← Back to all countries </Link> </main>
)
}

const country = countries.find(
(item) => item.alpha3Code.toLowerCase() === code?.toLowerCase(),
)

if (!country) {
  return (
    <main className="details-page">
      <h1>Landet hittades inte</h1>
      <p>Vi kunde inte hitta landet du letar efter.</p>
      <Link className="back-link" to={`/${location.search}`}>
        ← Tillbaka till alla länder
      </Link>
    </main>
  )
}

return ( <CountryDetailsContent
   country={country}
   locationSearch={location.search}
 />
)
}

function CountryDetailsContent({
country,
locationSearch,
}: {
country: Country
locationSearch: string
}) {
const capital = Array.isArray(country.capital)
? country.capital[0]
: country.capital

const wikipediaQuery = useQuery({
queryKey: ['wikipedia', country.alpha3Code],
queryFn: () => getWikipediaInfo(country.name),
staleTime: 1000 * 60 * 60,
retry: 1,
})

const weatherQuery = useQuery({
queryKey: ['weather', country.alpha3Code],
queryFn: async () => {
let coordinates: number[] | undefined


if (capital) {
    const geocodingUrl =
`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(capital)}&countryCode=${country.alpha2Code}&count=1&language=sv&format=json`
    const response = await fetch(geocodingUrl)

    if (response.ok) {
      const data = await response.json()

      if (data.results?.length) {
        coordinates = [
          data.results[0].latitude,
          data.results[0].longitude,
        ]
      }
    }
  }

  if (!coordinates && country.latlng?.length === 2) {
    coordinates = country.latlng
  }

  if (!coordinates) {
    throw new Error('Coordinates unavailable')
  }

  return getWeather(coordinates[0], coordinates[1])
},
staleTime: 1000 * 60 * 10,
retry: 1,

})

return ( <main className="details-page">
<Link className="back-link" to={`/${locationSearch}`}>
← Back to all countries </Link>



<section className="details-card">
  <div
    className="country-detail-hero"
    style={{
      backgroundImage: `linear-gradient(
        180deg,
        rgba(7, 25, 36, 0.12) 10%,
        rgba(7, 25, 36, 0.82) 100%
      ), url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85")`,
    }}
  >
    {country.flags?.svg || country.flags?.png ? (
      <img
        className="details-flag"
        src={country.flags.svg || country.flags.png}
        alt={`Flag of ${country.name}`}
      />
    ) : null}

    <p className="details-region">
      {country.region}
      {country.subregion ? ` · ${country.subregion}` : ''}
    </p>

    <h1 className="details-title">{country.name}</h1>

    {country.nativeName &&
      country.nativeName !== country.name && (
        <p className="details-native-name">
          {country.nativeName}
        </p>
      )}
  </div>



    {country.nativeName &&
      country.nativeName !== country.name && (
        <p className="details-native-name">
          {country.nativeName}
        </p>
      )}

    <div className="details-grid">
      <div className="details-item">
        <span>Capital</span>
        <strong>{capital || 'Not available'}</strong>
      </div>

      <div className="details-item">
        <span>Population</span>
        <strong>{country.population.toLocaleString()}</strong>
      </div>

      <div className="details-item">
        <span>Area</span>
        <strong>
          {country.area != null
            ? `${country.area.toLocaleString()} km²`
            : 'Not available'}
        </strong>
      </div>

      <div className="details-item">
        <span>Country code</span>
        <strong>{country.alpha3Code}</strong>
      </div>
    </div>

    <div className="details-extra">
      <h2>Current weather</h2>

      {weatherQuery.isLoading ? (
        <p>Loading weather...</p>
      ) : weatherQuery.isError ? (
        <p>Weather information unavailable.</p>
      ) : weatherQuery.data ? (
        <p>
          {weatherQuery.data.description} ·{' '}
          {weatherQuery.data.temperature} °C · Wind{' '}
          {weatherQuery.data.windSpeed} km/h
        </p>
      ) : null}
    </div>

    <div className="details-extra">
      <h2>Languages</h2>
      <p>
        {country.languages?.length
          ? country.languages
              .map((language) =>
                typeof language === 'string'
                  ? language
                  : language.name,
              )
              .join(', ')
          : 'Information unavailable'}
      </p>
    </div>

    <div className="details-extra">
      <h2>Currency</h2>
      <p>
        {country.currencies?.length
          ? country.currencies
              .map((currency) =>
                typeof currency === 'string'
                  ? currency
                  : [
                      currency.name,
                      currency.code,
                      currency.symbol,
                    ]
                      .filter(Boolean)
                      .join(' '),
              )
              .join(', ')
          : 'Information unavailable'}
      </p>
    </div>

    <div className="details-extra">
      <h2>Bordering countries</h2>
      <p>
        {country.borders?.length
          ? country.borders.join(', ')
          : 'No bordering countries available'}
      </p>
    </div>

    <div className="details-extra">
      <h2>Explore on the map</h2>
      <a
        className="map-button"
        href={
          country.maps?.googleMaps ||
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name)}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps →
      </a>
    </div>

    <div className="details-extra wikipedia-card">
      <h2>About {country.name}</h2>

      {wikipediaQuery.isLoading ? (
        <p>Loading information...</p>
      ) : wikipediaQuery.isError ? (
        <p>Wikipedia information is unavailable.</p>
      ) : wikipediaQuery.data ? (
        <>
          {wikipediaQuery.data.image && (
            <img
              className="wikipedia-image"
              src={wikipediaQuery.data.image}
              alt={`About ${country.name}`}
            />
          )}

          <p>{wikipediaQuery.data.extract}</p>

          <a
            href={wikipediaQuery.data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on Wikipedia →
          </a>
        </>
      ) : null}
    </div>
  </section>
</main>


)
}

export default CountryDetails
