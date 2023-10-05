import { ErrorBoundary } from 'react-error-boundary'
import { toast } from 'sonner'

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

const DriverProfile = () => {
  return (
    <main className="driver-profile__container page__container">
      <DriverProfileContextProvider>
        <Information useInformationQuery={useDriverInformationQuery} />
        <Achievements useAchievements={useDriverAchievements} />

        <StatisticsHolder>
          <ErrorBoundary
            fallback={<></>}
            onError={() => toast("The driver doesn't have any race statistics data.")}
          >
            <Statistics
              title="Races Statistics"
              useStatsQuery={useDriverRacesStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallback={<></>}
            onError={() => toast.success("The driver doesn't have any championship standings data.")}
          >
            <Statistics
              title="Standings Statistics"
              note="*Always updated at the end of the current season"
              useStatsQuery={useDriverStandingsStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallback={<></>}
            onError={() => toast("The driver doesn't have any qualifying statistics data.")}
          >
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
