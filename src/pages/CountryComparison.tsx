import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getCountries, type Country } from '../api/countries'
import './CountryComparison.css'

export default function CountryComparison() {
  const [firstCode, setFirstCode] = useState('')
  const [secondCode, setSecondCode] = useState('')

  const {
    data: countries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60,
  })

  const firstCountry = countries.find(
    (country: Country) => country.alpha3Code === firstCode,
  )

  const secondCountry = countries.find(
    (country: Country) => country.alpha3Code === secondCode,
  )

  if (isLoading) {
    return (
      <main className="comparison-page">
        <p role="status">Loading countries...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="comparison-page">
        <p role="alert">
          Could not load countries. Please try again.
        </p>
      </main>
    )
  }

  return (
    <main className="comparison-page">
      <Link to="/" className="comparison-back-link">
        ← Back to all countries
      </Link>

      <header className="comparison-header">
        <p className="comparison-eyebrow">
          DISCOVER THE DIFFERENCES
        </p>

        <h1>Compare countries</h1>

        <p className="comparison-description">
          Choose two destinations and compare them side by side.
        </p>
      </header>

      <section
        className="comparison-selectors"
        aria-label="Choose countries"
      >
        <div className="comparison-selector">
          <label htmlFor="first-country">
            First country
          </label>

          <select
            id="first-country"
            value={firstCode}
            onChange={(event) => setFirstCode(event.target.value)}
          >
            <option value="">Choose a country</option>

            {countries.map((country) => (
              <option
                key={country.alpha3Code}
                value={country.alpha3Code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <span className="comparison-versus" aria-hidden="true">
          VS
        </span>

        <div className="comparison-selector">
          <label htmlFor="second-country">
            Second country
          </label>

          <select
            id="second-country"
            value={secondCode}
            onChange={(event) => setSecondCode(event.target.value)}
          >
            <option value="">Choose a country</option>

            {countries.map((country) => (
              <option
                key={country.alpha3Code}
                value={country.alpha3Code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {firstCode && secondCode && firstCode === secondCode && (
        <p className="comparison-empty" role="status">
          Please choose two different countries.
        </p>
      )}

      {(!firstCode || !secondCode) && (
        <p className="comparison-empty">
          Choose two countries above to compare them.
        </p>
      )}

      {firstCountry &&
        secondCountry &&
        firstCode !== secondCode && (
          <section
            className="comparison-grid"
            aria-label="Country comparison"
          >
            {[firstCountry, secondCountry].map((country) => (
              <article
                className="comparison-card"
                key={country.alpha3Code}
              >
                <header className="comparison-card-header">
                  <img
                    className="comparison-flag"
                    src={country.flags.svg || country.flags.png}
                    alt={`Flag of ${country.name}`}
                  />

                  <h2>{country.name}</h2>

                  <p className="comparison-region">
                    {country.region || 'Region unavailable'}
                  </p>
                </header>

                <dl className="comparison-facts">
                  <div className="comparison-fact">
                    <dt>Capital</dt>
                    <dd>
                      {Array.isArray(country.capital)
                        ? country.capital.join(', ')
                        : country.capital || 'Not available'}
                    </dd>
                  </div>

                  <div className="comparison-fact">
                    <dt>Population</dt>
                    <dd>
                      {country.population.toLocaleString('en-US')}
                    </dd>
                  </div>

                  <div className="comparison-fact">
                    <dt>Area</dt>
                    <dd>
                      {country.area != null
                        ? `${country.area.toLocaleString('en-US')} km²`
                        : 'Not available'}
                    </dd>
                  </div>

                  <div className="comparison-fact">
                    <dt>Languages</dt>
                    <dd>
                      {country.languages?.length
                        ? country.languages
                            .map((language) => language.name)
                            .join(', ')
                        : 'Not available'}
                    </dd>
                  </div>

                  <div className="comparison-fact">
                    <dt>Currency</dt>
                    <dd>
                      {country.currencies?.length
                        ? country.currencies
                            .map(
                              (currency) =>
                                currency.name || currency.code,
                            )
                            .filter(Boolean)
                            .join(', ')
                        : 'Not available'}
                    </dd>
                  </div>
                </dl>

                <Link
                  to={`/country/${country.alpha3Code.toLowerCase()}`}
                  className="comparison-details-link"
                >
                  View country details →
                </Link>
              </article>
            ))}
          </section>
        )}
    </main>
  )
}