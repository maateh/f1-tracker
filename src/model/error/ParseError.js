class ParseError extends Error {
  constructor(errorMsg) {
    super(`An error occured while parsing the data. (${errorMsg})`)
    this.fallbackMsg = 'Sorry! An unexpected error occured while we try to parsing the data. Please try again.'
  }
}

export default ParseError
