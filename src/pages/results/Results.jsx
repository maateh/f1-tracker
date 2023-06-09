import { useReducer } from 'react'

// components
import ResultsInfo from './ResultsInfo'

// hooks 
import { INITIAL_DATA_STATE, useDataReducer } from '../../hooks/useDataReducer'
import { useFetchWithDispatch } from '../../hooks/useFetchWithDispatch'

// styles
import './Results.css'

const Results = () => {
  const year = 2023
  const [state, dispatch] = useReducer(useDataReducer, INITIAL_DATA_STATE)
  useFetchWithDispatch(dispatch, `/${year}/results`, 'RaceTable', '?limit=500')

  return (
    <main className="results__container">
      <h1 className="page__title">Results</h1>
      {state.data && <ResultsInfo data={state.data} />}
    </main>
  )
}

export default Results