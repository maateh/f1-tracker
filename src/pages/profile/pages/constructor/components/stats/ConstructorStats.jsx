// components
import Statistics from '../../../../components/statistics/Statistics'

// hooks
import useConstructorRacesQuery from './hooks/useConstructorRacesQuery'
import useConstructorAchievementsQuery from './hooks/useConstructorAchievementsQuery'
import useConstructorQualifyingsQuery from './hooks/useConstructorQualifyingsQuery'

// styles
import './ConstructorStats.css'

const ConstructorStats = () => {
  return (
    <section className="constructor-stats__container">
      <Statistics
        title="Races Results"
        useStatsQuery={useConstructorRacesQuery}
      />

      <Statistics
        title="Achievements"
        useStatsQuery={useConstructorAchievementsQuery}
      />

      <Statistics
        title="Qualifyings Results"
        useStatsQuery={useConstructorQualifyingsQuery}
      />
    </section>
  )
}

export default ConstructorStats
