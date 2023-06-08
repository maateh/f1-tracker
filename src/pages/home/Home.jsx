import { useEffect } from 'react'

// hooks
import { useWeekendContext } from '../../hooks/useWeekendContext'
import { useFetch } from '../../hooks/useFetch'

// components
import WeekendInfo from './WeekendInfo'

// styles
import './Home.css'


// TODO:
// A context miatt egy pillanatra megjelenik az ERROR üzenet
// -> implementálni kéne az isPending és error property-ket is
// a contextektbe || vagy egy fetchIsReady propertyt (?)
// Home & Schedule

const Home = () => {
  const { weekend, dispatch } = useWeekendContext()

  const { data, isPending, error } = useFetch('/current/next', 'RaceTable')

  useEffect(() => {
    dispatch({ type: 'SET_WEEKEND', payload: data })
  }, [data, dispatch])

  return (
    <main className="home__container">
      <h1 className="page__title">
        Track the most <span className="title--highlight">Formula 1</span> statistics in one place!
      </h1>

      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weekend && <WeekendInfo data={weekend} />}
    </main>
  )
}

export default Home


// TODO:
// aktuális versenyhétvége információ
// melyik szabadedzés, kvali, verseny következik, visszaszámlálóval
// online közvetítési opciók linkelése (f1tv, m4)