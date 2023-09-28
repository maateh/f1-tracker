// components
import ConstructorInformation from './components/information/ConstructorInformation'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// hooks
import useConstructorAchievements from './components/achievements/hooks/useConstructorAchievements'
import useConstructorRacesStatsQuery from './components/stats/hooks/useConstructorRacesStatsQuery'
import useConstructorStandingsStatsQuery from './components/stats/hooks/useConstructorStandingsStatsQuery'
import useConstructorQualifyingsStatsQuery from './components/stats/hooks/useConstructorQualifyingsStatsQuery'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

const ConstructorProfile = () => {
  return (
    <div className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider>
        <ConstructorInformation />
        <Achievements
          useAchievements={useConstructorAchievements}
          note="*Always updated at the end of the current season"
        />
        <StatisticsHolder>
          <Statistics
            title="Races Statistics"
            useStatsQuery={useConstructorRacesStatsQuery}
          />
          <Statistics
            title="Standings Statistics"
            note="*Always updated at the end of the current season"
            useStatsQuery={useConstructorStandingsStatsQuery}
          />
          <Statistics
            title="Qualifyings Statistics"
            useStatsQuery={useConstructorQualifyingsStatsQuery}
          />
        </StatisticsHolder>
        <ConstructorSeasons />
      </ConstructorProfileContextProvider>
    </div>
  )
}

export default ConstructorProfile
