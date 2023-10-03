const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log('ErrorFallback - error: ', error)

  return (
    <div className="error-fallback">
      <h1>Something went wrong.</h1>
      <p>{error.fallbackMsg}</p>
      <button className="error-reset" onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback
