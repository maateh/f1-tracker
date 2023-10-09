import { ErrorBoundary } from 'react-error-boundary'

// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// hooks
import useConstructorStandingsListQuery from './hooks/useConstructorStandingsListQuery'
import useConstructorQualifyingsQuery from './hooks/useConstructorQualifyingsQuery'
import useConstructorRacesQuery from './hooks/useConstructorRacesQuery'

import useConstructorInformationQuery from './components/information/hooks/useConstructorInformationQuery'
import useConstructorAchievements from './components/achievements/hooks/useConstructorAchievements'
import useConstructorRacesStats from './components/stats/hooks/useConstructorRacesStats'
import useConstructorStandingsStats from './components/stats/hooks/useConstructorStandingsStats'
import useConstructorQualifyingsStats from './components/stats/hooks/useConstructorQualifyingsStats'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

const ConstructorProfile = () => {
  return (
    <main className="constructor-profile__container page__container">
      <ConstructorProfileContextProvider
        useStandingsListQuery={useConstructorStandingsListQuery}
        useQualifyingsQuery={useConstructorQualifyingsQuery}
        useRacesQuery={useConstructorRacesQuery}
      >
        <Information useInformationQuery={useConstructorInformationQuery} />

        <ErrorBoundary fallback={<>Fallback here</>}>
          <Achievements useAchievements={useConstructorAchievements} />
        </ErrorBoundary>

        <StatisticsHolder>
          <ErrorBoundary fallback={<></>}>
            <Statistics
              title="Races Statistics"
              useStats={useConstructorRacesStats}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>}>
            <Statistics
              title="Standings Statistics"
              note="*Always updated at the end of the current season"
              useStats={useConstructorStandingsStats}
            />
          </ErrorBoundary>
          <ErrorBoundary fallback={<></>}>
            <Statistics
              title="Qualifyings Statistics"
              useStats={useConstructorQualifyingsStats}
            />
          </ErrorBoundary>
        </StatisticsHolder>

        <ErrorBoundary fallback={<>Fallback here</>}>
          <ConstructorSeasons />
        </ErrorBoundary>
      </ConstructorProfileContextProvider>
    </main>
  )
}

export default ConstructorProfile
