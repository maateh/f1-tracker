// hooks
import { useFetch } from '../../hooks/useFetch'

// components
import WeekendInfo from '../../components/WeekendInfo/WeekendInfo'

// styles
import './Home.css'

const Home = () => {
  const { data, isPending, error } = useFetch('/current/next', 'RaceTable')

  return (
    // TODO:
    // aktuális versenyhétvége információ
    // melyik szabadedzés, kvali, verseny következik, visszaszámlálóval
    // online közvetítési opciók linkelése (f1tv, m4)

    <main className="home">
      <div className="home__container">
        <h1 className="home__container__title">Track the most <span className="home__container__title--highlight">Formula 1</span> statistics in one place!</h1>

        {isPending && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {data && <WeekendInfo data={data} />}
      </div>
    </main>
  )
}

export default Home