// models
import ListingTitle from "./ListingTitle"
import ListingTable from "./ListingTable"
import ListingGrid from "./ListingGrid"

class Listing {
  constructor({ title, table, grid }) {
    this.title = title && new ListingTitle(title)
    this.table = table && new ListingTable(table)
    this.grid = grid && new ListingGrid(grid)
  }
}

export default Listing
