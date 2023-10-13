import { cloneElement } from 'react'

// components
import Search from '../../search/Search'

// styles
import './Cards.css'

const Cards = ({ cards: { styles, layouts }, searchOption, searchTitle, lastIndex, lastRef }) => {
  return (
    <>
      {searchOption && <Search title={searchTitle} />}
      <ul className="cards__container" style={styles}>
        {layouts.map((layout, index) => {
          return (index + 1) % lastIndex === 0
            ? cloneElement(layout, { lastRef })
            : layout
        })}
      </ul>
    </>
  )
}

export default Cards
