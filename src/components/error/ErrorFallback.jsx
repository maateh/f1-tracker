// icons
import ErrorIcon from '@mui/icons-material/Error'

// styles
import './Error.css'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <ErrorIcon className="error__icon" />
      <p className="error-title">Oops!</p>
      <p className="error-info">Something went wrong!</p>
      <p className="error-msg">{error.fallbackMsg}</p>
      <button
        className="error-reset__btn btn"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
