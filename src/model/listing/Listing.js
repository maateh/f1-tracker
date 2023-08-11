// models
import ListingTitle from "./ListingTitle"
import ListingCards from "./ListingCards"
import ListingTable from "./ListingTable"

class Listing {
  constructor({ title, cards, table }) {
    this.title = title && new ListingTitle(title)
    this.cards = cards && new ListingCards(cards)
    this.table = table && new ListingTable(table)
  }
}

export default Listing
