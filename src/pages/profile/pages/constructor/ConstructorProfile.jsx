import { ErrorBoundary } from 'react-error-boundary'

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
import useToaster from '../../../../components/toaster/hooks/useToaster'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

const ConstructorProfile = () => {
  const { warningToast } = useToaster()

  return (
    <main className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider>
        <Information useInformationQuery={useConstructorInformationQuery} />
        <Achievements useAchievements={useConstructorAchievements} />

        <StatisticsHolder>
          <ErrorBoundary
            fallback={<></>}
            onError={() => warningToast("The constructor doesn't have any race statistics data.")}
          >
            <Statistics
              title="Races Statistics"
              useStatsQuery={useConstructorRacesStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallback={<></>}
            onError={() => warningToast("The constructor doesn't have any championship standings data.")}
          >
            <Statistics
              title="Standings Statistics"
              note="*Always updated at the end of the current season"
              useStatsQuery={useConstructorStandingsStatsQuery}
            />
          </ErrorBoundary>
          <ErrorBoundary
            fallback={<></>}
            onError={() => warningToast("The constructor doesn't have any qualifying statistics data.")}
          >
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
