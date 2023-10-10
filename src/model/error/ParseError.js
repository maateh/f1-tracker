class ParseError extends Error {
  constructor(errorMsg) {
    super(`An error occurred while parsing the data. (${errorMsg})`)
    this.fallbackMsg = 'Sorry! An unexpected error occurred while we try to parsing the data. Please try again.'
  }
}

export default ParseError
