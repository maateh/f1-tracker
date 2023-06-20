// styles
import './Error.css'

const Error = ({ error }) => {
  error = {
    details: 'Error details',
    code: 400
  }

  return (
    <div className="error-page__container">
      <h2 className="error-page__title">Ooops!</h2>
      <h4 className="error-page__subtitle">Failed to load required data. Try refresh the page.</h4>

      <p className="error-code">{error.code}</p>
      <p className="error-details">{error.details}</p>

      <button
        className="btn"
        onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
  )
}

export default Error