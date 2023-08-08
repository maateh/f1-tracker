class QueryError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code || '400'
  }

  get details() {
    if (this.code === 404) {
      return `
        Sorry! There are no data recorded in the database with the specified filter.
        Please try using a different filter.
      `
    }

    return `
      Failed to load required data.
      Please try refresh the page.
    `
  }
}

export default QueryError