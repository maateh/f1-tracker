// components
import DriverAchievements from './components/achievements/DriverAchievements'
import DriverRaces from './components/races/DriverRaces'
import DriverQualifyings from './components/qualifyings/DriverQualifyings'

// styles
import './DriverStats.css'

const DriverStats = () => {
  return (
    <section className="driver-stats__container">
      <DriverRaces />
      <DriverAchievements />
      <DriverQualifyings />
    </section>
  )
}

export default DriverStats
