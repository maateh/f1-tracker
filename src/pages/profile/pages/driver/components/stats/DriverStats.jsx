// components
import Statistics from '../../../../components/statistics/Statistics'

// hooks
import useDriverRacesQuery from './hooks/useDriverRacesQuery'
import useDriverAchievementsQuery from './hooks/useDriverAchievementsQuery'
import useDriverQualifyingsQuery from './hooks/useDriverQualifyingsQuery'

// styles
import './DriverStats.css'

const DriverStats = () => {
  return (
    <section className="driver-stats__container">
      <Statistics
        title="Races Results"
        useStatsQuery={useDriverRacesQuery}
      />

      <Statistics
        title="Achievements"
        useStatsQuery={useDriverAchievementsQuery}
      />

      <Statistics
        title="Qualifyings Results"
        useStatsQuery={useDriverQualifyingsQuery}
      />
    </section>
  )
}

export default DriverStats
