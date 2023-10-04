// icons
import ErrorIcon from '@mui/icons-material/Error'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

// styles
import './Error.css'

const ApplicationErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div className="error-fallback large">
      <ErrorIcon className="error__icon" />
      <p className="error-title">Oops!</p>
      <p className="error-info">An error occured.</p>

      <p className="error-msg">Unfortunately, the application has crashed because something unexpected happened.</p>
      <p className="error-msg">Please try refresh the page, or come back later.</p>

			<button className="btn icon__container" onClick={resetErrorBoundary}>
				<SkipPreviousIcon />
				<span>Previous page</span>
			</button>
    </div>
  )
}

export default ApplicationErrorFallback
