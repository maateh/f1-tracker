// models
import ListingTitle from "./ListingTitle"
import ListingCards from "./ListingCards"
import ListingTable from "./ListingTable"
import Pagination from "./Pagination"

class Listing {
  constructor({ title, cards, table, pagination }) {
    this.title = title && new ListingTitle(title)
    this.cards = cards && new ListingCards(cards)
    this.table = table && new ListingTable(table)
    this.pagination = pagination && new Pagination(pagination)
  }
}

export default Listing
