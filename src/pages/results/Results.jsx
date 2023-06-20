import { Outlet } from 'react-router-dom'

// components
import ResultsFilter from './filter/ResultsFilter'

// styles
import './Results.css'

const Results = () => {
  return (
    <main className="results__container">
      <h1 className="page__title">Results</h1>

      <ResultsFilter />
      <Outlet />
    </main>
  )
}

export default Results