import { cloneElement } from 'react'

// styles
import './Cards.css'

const Cards = ({ cards: { styles, layouts }, lastIndex, lastRef }) => {
  
  // TODO: items -> layouts[].props
	// const filteredItems = useMemo(() => {
	// 	return items.filter(item => item.toLowerCase().includes(query.toLowerCase))
	// }, [items, query])

  return (
    <ul className="cards__container" style={styles}>
      {layouts.map((layout, index) => {
        return (index + 1) % lastIndex === 0
          ? cloneElement(layout, { lastRef })
          : layout
      })}
    </ul>
  )
}

export default Cards
