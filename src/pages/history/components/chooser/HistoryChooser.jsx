import { NavLink } from 'react-router-dom'

// styles
import './HistoryChooser.css'

const options = [
  { placeholder: 'Laps', value: 'laps' },
  { placeholder: 'Pit Stops', value: 'pits' },
  { placeholder: 'Drivers (?)', value: 'drivers' },
  { placeholder: 'Constructors (?)', value: 'constructors' },
]

const HistoryChooser = () => {
  return (
    <div className="history-chooser">
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

export default HistoryChooser