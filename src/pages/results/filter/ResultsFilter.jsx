// components
import CurrentFilterList from './CurrentFilterList'
import FilterOptions from './FilterOptions'

// styles
import './ResultsFilter.css'

const ResultsFilter = () => {

  return (
    <div className="results-filter">
      <CurrentFilterList />
      <FilterOptions />
    </div>
  )
}

export default ResultsFilter