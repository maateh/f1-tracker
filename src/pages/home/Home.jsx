import { useEffect } from 'react'

// context
import { useWeekendContext } from '../../hooks/useWeekendContext'

// components
import WeekendInfo from './WeekendInfo'

// styles
import './Home.css'
import Weekend from '../../model/schedule/weekend/Weekend'

const Home = () => {
  const { weekend, loading, error, dispatch } = useWeekendContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    Weekend.fetch('/current/next')
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }))
  }, [dispatch])

  return (
    <main className="home__container">
      <h1 className="page__title">
        Track the most <span className="highlight">Formula 1</span> statistics in one place!
      </h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weekend && <WeekendInfo />}
    </main>
  )
}

export default Home


// TODO:
// aktuális versenyhétvége információ
// melyik szabadedzés, kvali, verseny következik, visszaszámlálóval
// online közvetítési opciók linkelése (f1tv, m4)