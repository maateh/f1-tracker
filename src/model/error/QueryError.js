class QueryError extends Error {
  constructor(message) {
    super(message)
    this.details = 'Failed to load required data. Please try refresh the page.'
    this.code = '400'
  }
}

export default QueryError