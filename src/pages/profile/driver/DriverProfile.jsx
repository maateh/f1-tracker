// components
import DriverInformation from './components/information/DriverInformation'
import DriverAchievements from './components/achievements/DriverAchievements'
import DriverRaces from './components/races/DriverRaces'
import DriverQualifyings from './components/qualifyings/DriverQualifyings'

// context
import DriverProfileContextProvider from './context/DriverProfileContext'

// styles
import './DriverProfile.css'

const DriverProfile = () => {
  return (
    <div className="driver-profile__container">
      <DriverProfileContextProvider>
        <DriverInformation />
        <DriverAchievements />
        <DriverRaces />
        <DriverQualifyings />
      </DriverProfileContextProvider>
    </div>
  )
}

export default DriverProfile
