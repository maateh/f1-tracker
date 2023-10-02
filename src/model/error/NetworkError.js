class NetworkError extends Error {
  constructor(errorMsg) {
    super(`Could not fetch the data! (${errorMsg})`)
    this.fallbackMsg = 'Sorry! The API may not be available. Please try again later.'
  }
}

export default NetworkError
