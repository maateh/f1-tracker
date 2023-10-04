// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import DriverSeasons from './components/seasons/DriverSeasons'

// hooks
import useDriverInformationQuery from './components/information/hooks/useDriverInformationQuery'
import useDriverAchievements from './components/achievements/hooks/useDriverAchievements'
import useDriverRacesStatsQuery from './components/stats/hooks/useDriverRacesStatsQuery'
import useDriverStandingsStatsQuery from './components/stats/hooks/useDriverStandingsStatsQuery'
import useDriverQualifyingsStatsQuery from './components/stats/hooks/useDriverQualifyingsStatsQuery'

// context
import DriverProfileContextProvider from './context/DriverProfileContext'
import { ErrorBoundary } from 'react-error-boundary'

const DriverProfile = () => {
  return (
    <main className="driver-profile__container page__container">
      <DriverProfileContextProvider>
        <Information useInformationQuery={useDriverInformationQuery} />
        <Achievements useAchievements={useDriverAchievements} />
        <StatisticsHolder>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Races Statistics"
              useStatsQuery={useDriverRacesStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Standings Statistics"
              note="*Always updated at the end of the current season"
              useStatsQuery={useDriverStandingsStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>} onError={() => console.log('toast message here')}>
            <Statistics
              title="Qualifyings Statistics"
              useStatsQuery={useDriverQualifyingsStatsQuery}
            />
          </ErrorBoundary>
        </StatisticsHolder>
        <DriverSeasons />
      </DriverProfileContextProvider>
    </main>
  )
}

export default DriverProfile
