// models
import Title from "./ListingTitle"
import Cards from "./ListingCards"
import Table from "./ListingTable"
import Pagination from "./Pagination"

class Listing {
  constructor({ title, cards, table, pagination }) {
    this.title = title && new Title(title)
    this.cards = cards && new Cards(cards)
    this.table = table && new Table(table)
    this.pagination = pagination && new Pagination(pagination)
  }
}

export default Listing
