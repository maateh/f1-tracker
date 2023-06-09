import { useReducer } from 'react'

// hooks
import { INITIAL_DATA_STATE, useDataReducer } from '../../hooks/useDataReducer'
import { useFetchWithDispatch } from '../../hooks/useFetchWithDispatch'

// components
import WeekendInfo from './WeekendInfo'

// styles
import './Home.css'

const Home = () => {
  const [state, dispatch] = useReducer(useDataReducer, INITIAL_DATA_STATE)
  useFetchWithDispatch(dispatch, '/current/next', 'RaceTable')

  return (
    <main className="home__container">
      <h1 className="page__title">
        Track the most <span className="highlight">Formula 1</span> statistics in one place!
      </h1>

      {state.loading && <p className="loading">Loading...</p>}
      {state.error && <p className="error">{state.error}</p>}

      {state.data && <WeekendInfo data={state.data} />}
    </main>
  )
}

export default Home


// TODO:
// aktuális versenyhétvége információ
// melyik szabadedzés, kvali, verseny következik, visszaszámlálóval
// online közvetítési opciók linkelése (f1tv, m4)