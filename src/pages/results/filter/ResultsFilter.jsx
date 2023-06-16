// components
import CurrentFilterList from './current/CurrentFilterList'
import FilterOptions from './options/FilterOptions'

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