// components
import HomeContent from './HomeContent'

// context
import { WeekendContextProvider } from './context/WeekendContext'

const Homepage = () => {
  return (
    <main className="page__container">
      <h1 className="page__title">
        Track the most <span className="highlight">Formula 1</span> statistics in one place!
      </h1>

      <WeekendContextProvider>
        <HomeContent />
      </WeekendContextProvider>
    </main>
  )
}

export default Homepage


// TODO:
// aktuális versenyhétvége információ
// melyik szabadedzés, kvali, verseny következik, visszaszámlálóval
// online közvetítési opciók linkelése (f1tv, m4)