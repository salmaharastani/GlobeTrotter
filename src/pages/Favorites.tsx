
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCountries } from '../api/countries'
import type { Country } from '../api/countries'
import { getWikipediaInfo } from '../api/wikipedia'
import '../App.css'

function Favorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('globetrotter-favorites')
      return saved ? (JSON.parse(saved) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    function handleStorageChange() {
      try {
        const saved = localStorage.getItem('globetrotter-favorites')
        setFavorites(saved ? (JSON.parse(saved) as string[]) : [])
      } catch {
        setFavorites([])
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  function removeFavorite(code: string) {
    const updated = favorites.filter((favorite) => favorite !== code)
    localStorage.setItem('globetrotter-favorites', JSON.stringify(updated))
    setFavorites(updated)
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

  const favoriteCountries = countries.filter((country: Country) =>
    favorites.includes(country.alpha3Code),
  )

  return (
    <div className="app">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="logo" to="/">
          🌍 GlobeTrotter
        </Link>
        <Link className="nav-label favorites-nav-link" to="/">
          ← Back to Explore
        </Link>
      </nav>

      <main className="main-content favorites-page">
        <section className="hero favorites-hero">
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>My Favorite Destinations <span>♥</span></h1>
          <p className="hero-text">
            All the countries you love, collected in one place.
          </p>
        </section>

        {isLoading && (
          <p className="status-message" role="status">
            Loading your favorite destinations...
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

        {!isLoading && !isError && favoriteCountries.length === 0 && (
          <section className="favorites-empty">
            <div className="favorites-empty-icon">♡</div>
            <h2>No favorites yet</h2>
            <p>
              You haven't saved any favorite countries yet. Explore the world
              and add countries by clicking the heart on a country card.
            </p>
            <Link className="favorites-explore-button" to="/">
              Explore countries →
            </Link>
          </section>
        )}

        {!isLoading && !isError && favoriteCountries.length > 0 && (
          <section className="countries-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SAVED PLACES</p>
                <h2>Your favorite countries</h2>
              </div>
              <span className="country-count">
                {favoriteCountries.length}{' '}
                {favoriteCountries.length === 1 ? 'favorite' : 'favorites'}
              </span>
            </div>

            <ul className="country-grid">
              {favoriteCountries.map((country) => (
                <li className="country-card" key={country.alpha3Code}>
                  <Link
                    to={`/country/${country.alpha3Code.toLowerCase()}`}
                    className="country-card-link"
                    aria-label={`Explore ${country.name}`}
                  >
                    <FavoriteCountryImage
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
                    className="country-favorite is-favorite"
                    aria-label={`Remove ${country.name} from favorites`}
                    aria-pressed="true"
                    onClick={() => removeFavorite(country.alpha3Code)}
                  >
                    ♥
                  </button>

                  <span className="country-arrow" aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>GlobeTrotter · Your favorite places, all in one place.</p>
      </footer>
    </div>
  )
}

function FavoriteCountryImage({
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
        if (!cancelled) setImage(info.image)
      })
      .catch(() => {
        if (!cancelled) setImage(null)
      })

    return () => {
      cancelled = true
    }
  }, [countryName])

  return (
    <div className="country-image-container">
      <img
        className={`country-image ${image ? '' : 'country-image-fallback'}`}
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

export default Favorites
