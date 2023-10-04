// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// hooks
import useConstructorInformationQuery from './components/information/hooks/useConstructorInformationQuery'
import useConstructorAchievements from './components/achievements/hooks/useConstructorAchievements'
import useConstructorRacesStatsQuery from './components/stats/hooks/useConstructorRacesStatsQuery'
import useConstructorStandingsStatsQuery from './components/stats/hooks/useConstructorStandingsStatsQuery'
import useConstructorQualifyingsStatsQuery from './components/stats/hooks/useConstructorQualifyingsStatsQuery'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'
import { ErrorBoundary } from 'react-error-boundary'

const ConstructorProfile = () => {
  return (
    <main className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider>
        <Information useInformationQuery={useConstructorInformationQuery} />
        <Achievements useAchievements={useConstructorAchievements} />
        <StatisticsHolder>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Races Statistics"
              useStatsQuery={useConstructorRacesStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Standings Statistics"
              note="*Always updated at the end of the current season"
              useStatsQuery={useConstructorStandingsStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Qualifyings Statistics"
              useStatsQuery={useConstructorQualifyingsStatsQuery}
            />
          </ErrorBoundary>
        </StatisticsHolder>
        <ConstructorSeasons />
      </ConstructorProfileContextProvider>
    </main>
  )
}

export default ConstructorProfile
