import { useRouteError } from 'react-router-dom'

// styles
import '../../../../error/Error.css'

const ListingError = () => {
  const error = useRouteError()

  return (
    <div className="error-page__container">
      <h2 className="error-page__title">Ooops!</h2>
      <h4 className="error-page__subtitle">Failed to load required data. Try refresh the page.</h4>

      <p className="error-code">{error.status}</p>
      <p className="error-details">{error.data}</p>

      <button
        className="btn"
        onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
  )
}
export default ListingError