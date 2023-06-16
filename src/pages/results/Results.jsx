// components
import ResultsFilter from './filter/ResultsFilter'

// styles
import './Results.css'
import { Outlet } from 'react-router-dom'

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