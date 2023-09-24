// components
import DriverInformation from './components/information/DriverInformation'
import DriverStats from './components/stats/DriverStats'
import DriverSeasons from './components/seasons/DriverSeasons'

// context
import DriverProfileContextProvider from './context/DriverProfileContext'

const DriverProfile = () => {
  return (
    <div className="driver-profile__container page__container">
      <DriverProfileContextProvider>
        <DriverInformation />
        <DriverStats />
        <DriverSeasons />
      </DriverProfileContextProvider>
    </div>
  )
}

export default DriverProfile
