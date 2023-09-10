import { NavLink } from 'react-router-dom'

// styles
import './HistoryChooser.css'

const options = [
  { placeholder: 'Laps', value: 'laps' },
  { placeholder: 'Pit Stops', value: 'pits' },
  { placeholder: 'Drivers', value: 'drivers' },
  { placeholder: 'Constructors', value: 'constructors' },
  { placeholder: 'Circuits', value: 'circuits' },
]

const HistoryChooser = () => {
  return (
    <section className="history-chooser">
      <h2 className="history-chooser__title">Select a category</h2>

      <div className="history-categories__container">
        {options.map(option => (
          <NavLink
            className="category-option"
            key={option.value}
            to={`./${option.value}`}
            preventScrollReset={true}
            replace={true}
          >{option.placeholder}</NavLink>
        ))}
      </div>
    </section>
  )
}

export default HistoryChooser
