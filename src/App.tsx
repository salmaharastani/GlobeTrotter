import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, Routes, Route, useSearchParams } from 'react-router-dom'
import { getCountries } from './api/countries'
import type { Country } from './api/countries'
import CountryDetails from './pages/CountryDetails'
import { getWikipediaInfo } from './api/wikipedia'
import './App.css'
import Favorites from './pages/Favorites'

function CountryImage({
  countryName,
  flag,
}: {
  countryName: string
  flag?: string
}) {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getWikipediaInfo(countryName)
      .then((info) => {
        if (!cancelled) {
          setImage(info.image)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setImage(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [countryName])

  return (
    <div className="country-image-container">
      <img
        className={`country-image ${
          image ? '' : 'country-image-fallback'
        }`}
        src={image || flag || ''}
        alt={image ? `Destination in ${countryName}` : `Flag of ${countryName}`}
        loading="lazy"
      />

      {flag && image && (
        <img
          className="country-flag-badge"
          src={flag}
          alt={`Flag of ${countryName}`}
          loading="lazy"
        />
      )}
    </div>
  )
}
const COUNTRIES_PER_PAGE = 12

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

    const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('globetrotter-favorites')
      return saved ? JSON.parse(saved) as string[] : []
    } catch {
      return []
    }
  })

  function toggleFavorite(countryCode: string) {
    setFavorites((previous) => {
      const updated = previous.includes(countryCode)
        ? previous.filter((code) => code !== countryCode)
        : [...previous, countryCode]

      localStorage.setItem(
        'globetrotter-favorites',
        JSON.stringify(updated),
      )

      return updated
    })
  }
  const search = searchParams.get('query') || ''
  const selectedRegion = searchParams.get('region') || 'All'
  const page = Math.max(
    1,
    Number(searchParams.get('page')) || 1
  )

  function updateURL(
    updates: {
      query?: string
      region?: string
      page?: number
    }
  ) {
    const params = new URLSearchParams(searchParams)

    if (updates.query !== undefined) {
      if (updates.query) {
        params.set('query', updates.query)
      } else {
        params.delete('query')
      }
    }

    if (updates.region !== undefined) {
      if (updates.region === 'All') {
        params.delete('region')
      } else {
        params.set('region', updates.region)
      }
    }

    if (updates.page !== undefined) {
      if (updates.page <= 1) {
        params.delete('page')
      } else {
        params.set('page', String(updates.page))
      }
    }

    setSearchParams(params)
  }

  const {
    data: countries = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60,
  })

  const filteredCountries = countries.filter((country: Country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion

    return matchesSearch && matchesRegion
  })

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE),
  )

  const currentPage = Math.min(page, totalPages)

  

  const visibleCountries = filteredCountries.slice(
    (currentPage - 1) * COUNTRIES_PER_PAGE,
    currentPage * COUNTRIES_PER_PAGE,
  )

 function handleSearch(value: string) {
  updateURL({
    query: value,
    page: 1,
  })
}

 function handleRegionChange(region: string) {
  updateURL({
    region,
    page: 1,
  })
}

  return (
    <div className="app">
      <nav className="navbar" aria-label="Main navigation">
  <Link className="logo" to="/">
    🌍 GlobeTrotter
  </Link>

  <div className="navbar-actions">
    <span className="nav-label">Discover the world</span>
    <Link className="favorites-nav-link" to="/favorites">
      ♥ My Favorites
    </Link>
  </div>
</nav>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
          <h1>Explore the world.</h1>
          <p className="hero-text">
            Discover countries, explore new cultures and find your next
            destination.
          </p>

          <label className="search-label" htmlFor="country-search">
            Search for a country
          </label>
          <input
            id="country-search"
            className="search-input"
            type="search"
            placeholder="Try Sweden, France, Japan..."
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
          />
        </section>

        <section className="countries-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE</p>
              <h2>Countries around the world</h2>
            </div>
            <span className="country-count">
              {filteredCountries.length} countries
            </span>
          </div>

          <div className="region-filters" aria-label="Filter by region">
            {['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(
              (region) => (
                <button
                  key={region}
                  type="button"
                  className={`region-button ${
                    selectedRegion === region ? 'active' : ''
                  }`}
                  aria-pressed={selectedRegion === region}
                  onClick={() => handleRegionChange(region)}
                >
                  {region}
                </button>
              ),
            )}
          </div>

          {isLoading && (
            <p className="status-message" role="status">
              Loading countries...
            </p>
          )}

          {isError && (
            <div className="status-message" role="alert">
              <p>Could not load countries. Please try again.</p>
              <button type="button" onClick={() => refetch()}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !isError && filteredCountries.length === 0 && (
            <p className="empty-message">
              No countries match your search.
            </p>
          )}

          {!isLoading && !isError && visibleCountries.length > 0 && (
            <>
              <ul className="country-grid">
                {visibleCountries.map((country) => (

<li className="country-card" key={country.alpha3Code}>
  <Link
    to={{
      pathname: `/country/${country.alpha3Code.toLowerCase()}`,
      search: window.location.search,
    }}
    className="country-card-link"
    aria-label={`Explore ${country.name}`}
  >
    <CountryImage
      countryName={country.name}
      flag={country.flags?.svg || country.flags?.png}
    />

    <h3>{country.name}</h3>

    <p className="country-region">{country.region}</p>

    <p className="country-capital">
      <span>Capital</span>
      {Array.isArray(country.capital)
        ? country.capital[0] || 'Not available'
        : country.capital || 'Not available'}
    </p>
  </Link>

  <button
  type="button"
  className={`country-favorite ${
    favorites.includes(country.alpha3Code) ? 'is-favorite' : ''
  }`}
  aria-label={
    favorites.includes(country.alpha3Code)
      ? `Remove ${country.name} from favorites`
      : `Add ${country.name} to favorites`
  }
  aria-pressed={favorites.includes(country.alpha3Code)}
  onClick={() => toggleFavorite(country.alpha3Code)}
>
  {favorites.includes(country.alpha3Code) ? '♥' : '♡'}
</button>

  <span className="country-arrow" aria-hidden="true">
    →
  </span>
</li>

                ))}
              </ul>

              <div className="pagination" aria-label="Country pages">
                <button
                  type="button"
                  disabled={currentPage === 1}
onClick={() => updateURL({ page: currentPage - 1 })}                >
                  Previous
                </button>

                <span aria-live="polite">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
onClick={() => updateURL({ page: currentPage + 1 })}                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>GlobeTrotter · Discover somewhere new.</p>
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="app">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="logo" to="/">
          🌍 GlobeTrotter
        </Link>

        <div className="navbar-actions">
          <span className="nav-label">Discover the world</span>
          <Link className="favorites-nav-link" to="/favorites">
            ♥ My Favorites
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <h1>404 – Page not found</h1>
          <p className="hero-text">
            Sorry, we could not find the page you are looking for.
          </p>
          <Link className="favorites-nav-link" to="/">
            Back to home
          </Link>
        </section>
      </main>
    </div>
  )
}
function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/country/:code" element={<CountryDetails />} />
    </Routes>
  )
}

export default App