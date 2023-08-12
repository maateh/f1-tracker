// models
import ListingTitle from "./ListingTitle"
import ListingCards from "./ListingCards"
import ListingTable from "./ListingTable"
import ListingPagination from "./ListingPagination"

class Listing {
  constructor({ title, cards, table, pagination }) {
    this.title = title && new ListingTitle(title)
    this.cards = cards && new ListingCards(cards)
    this.table = table && new ListingTable(table)
    this.pagination = pagination && new ListingPagination(pagination)
  }
}

export default Listing
