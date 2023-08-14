// styles
import './ListingCards.css'

const ListingCards = ({ cards: { styles, layouts }}) => {
  return (
    <ul className="listing-cards__container" style={styles}>
      {layouts.map(layout => layout)}
    </ul>
  )
}

export default ListingCards
