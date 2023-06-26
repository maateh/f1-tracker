import { NavLink } from 'react-router-dom'

// styles
import './HistorySelector.css'

const options = [
  { placeholder: 'Laps', value: 'laps' },
  { placeholder: 'Drivers', value: 'drivers' },
  { placeholder: 'Constructors', value: 'constructors' },
  { placeholder: 'Pit Stops', value: 'pits' }
]

const HistorySelector = () => {
  return (
    <div className="history-selector">
      <h2 className="page__subtitle">Choose a category</h2>
      <div className="category-container">
        {options.map(option => (
          <NavLink
            key={option.value}
            className="option"
            to={`./${option.value}`}
            preventScrollReset={true}
          >{option.placeholder}</NavLink>
        ))}
      </div>
    </div>
  )
}

export default HistorySelector