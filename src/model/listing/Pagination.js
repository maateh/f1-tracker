class Pagination {
  constructor({
    total,
    limit,
    pageQuantity,
    currentPage
  }) {
    this.total = +total
    this.limit = +limit
    this.pageQuantity = +pageQuantity
    this.currentPage = +currentPage
  }

  getCurrentOffset() {
    return this.currentPage * this.limit
  }
}

export default Pagination
