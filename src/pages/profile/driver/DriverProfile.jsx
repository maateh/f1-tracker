// components
import DriverInformation from './components/information/DriverInformation'
import DriverAchievements from './components/achievements/DriverAchievements'
import DriverRaces from './components/races/DriverRaces'
import DriverQualifyings from './components/qualifyings/DriverQualifyings'
import DriverSeasons from './components/seasons/DriverSeasons'

// context
import DriverProfileContextProvider from './context/DriverProfileContext'

// styles
import './DriverProfile.css'

const DriverProfile = () => {
  return (
    <div className="driver-profile__container page__container">
      <DriverProfileContextProvider>
        <DriverInformation />
        <DriverRaces />
        <DriverAchievements />
        <DriverQualifyings />
        <DriverSeasons />
      </DriverProfileContextProvider>
    </div>
  )
}

export default DriverProfile
