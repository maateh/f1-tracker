// models
import Title from "./Title"
import Cards from "./Cards"
import Table from "./Table"
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
