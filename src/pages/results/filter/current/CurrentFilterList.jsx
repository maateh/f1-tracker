// context
import { useResultsFilterContext } from '../../context/hooks/useResultsFilterContext'

// styles
import './CurrentFilterList.css'

const CurrentFilterList = () => {
  const { currentFilters } = useResultsFilterContext()

  return (
    <div className="current-filters">
      <h2 className="page__subtitle">Current Filters</h2>

      {Object.entries(currentFilters.get()).map(([key, value]) => (
        <div className="filter" key={key}>
          <span className="filter-key">{key}: </span>
          <span className="filter-value">{value.label}</span>
        </div>
      ))}
    </div>
  )
}

export default CurrentFilterList