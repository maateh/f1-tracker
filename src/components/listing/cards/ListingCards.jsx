import React from 'react'

// styles
import './ListingCards.css'

const ListingCards = ({ cards: { styles, layouts }, lastIndex, lastRef }) => {
  return (
    <ul className="listing-cards__container" style={styles}>
      {layouts.map((layout, index) => {
        return index + 1 === lastIndex
          ? React.cloneElement(layout, { lastRef })
          : layout
      })}
    </ul>
  )
}

export default ListingCards
