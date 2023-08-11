// styles
import './ListingCards.css'

const ListingCards = ({ cards: { styles, layouts }}) => {
  return (
    <div className="listing-cards__container" style={styles}>
      {layouts.map(layout => layout)}
    </div>
  )
}

export default ListingCards
