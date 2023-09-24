// components
import ConstructorInformation from './components/information/ConstructorInformation'
import ConstructorAchievements from './components/achievements/ConstructorAchievements'
import ConstructorRaces from './components/races/ConstructorRaces'
import ConstructorQualifyings from './components/qualifyings/ConstructorQualifyings'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

// styles
import './ConstructorProfile.css'

const ConstructorProfile = () => {
  return (
    <div className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider>
        <ConstructorInformation />
        <ConstructorRaces />
        <ConstructorAchievements />
        <ConstructorQualifyings />
        <ConstructorSeasons />
      </ConstructorProfileContextProvider>
    </div>
  )
}

export default ConstructorProfile
