class DataNotFoundError extends Error {
  constructor(url) {
    super(`Data not found! (${url})`)
    this.fallbackMsg = 'Sorry! There are no data recorded in the database with this request.'
  }
}

export default DataNotFoundError
