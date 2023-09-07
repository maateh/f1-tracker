import { cloneElement } from 'react'

// styles
import './Cards.css'

const ListingCards = ({ cards: { styles, layouts }, lastIndex, lastRef }) => {
  return (
    <ul className="cards__container" style={styles}>
      {layouts.map((layout, index) => {
        return index + 1 === lastIndex
          ? cloneElement(layout, { lastRef })
          : layout
      })}
    </ul>
  )
}

export default ListingCards
