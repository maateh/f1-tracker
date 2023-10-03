const ApplicationErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <h1>Oops! Something went wrong.</h1>
      <p>Unfortunately, the application has crashed because something unexpected happened.</p>
      <p>Please try to refresh the page, or come back later.</p>
      <button className="error-reset" onClick={resetErrorBoundary}>Refresh page</button>
    </div>
  )
}

export default ApplicationErrorFallback
