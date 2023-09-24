// components
import ConstructorInformation from './components/information/ConstructorInformation'
import ConstructorStats from './components/stats/ConstructorStats'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

const ConstructorProfile = () => {
  return (
    <div className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider>
        <ConstructorInformation />
        <ConstructorStats />
        <ConstructorSeasons />
      </ConstructorProfileContextProvider>
    </div>
  )
}

export default ConstructorProfile
