import { ErrorBoundary } from 'react-error-boundary'

// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ConstructorSeasons from './components/seasons/ConstructorSeasons'

// hooks
import useConstructorInfoQuery from './hooks/useConstructorInfoQuery'
import useConstructorStandingsListQuery from './hooks/useConstructorStandingsListQuery'
import useConstructorQualifyingsResultsQuery from './hooks/useConstructorQualifyingsResultsQuery'
import useConstructorRacesResultsQuery from './hooks/useConstructorRacesResultsQuery'

import useConstructorInformation from './components/information/hooks/useConstructorInformation'
import useConstructorAchievements from './components/achievements/hooks/useConstructorAchievements'
import useConstructorRacesStats from './components/stats/hooks/useConstructorRacesStats'
import useConstructorStandingsStats from './components/stats/hooks/useConstructorStandingsStats'
import useConstructorQualifyingsStats from './components/stats/hooks/useConstructorQualifyingsStats'

// context
import ProfileContextProvider from '../../context/ProfileContext'

const ConstructorProfile = () => {
  return (
    <ProfileContextProvider
      useInfoQuery={useConstructorInfoQuery}
      useStandingsListQuery={useConstructorStandingsListQuery}
      useRacesResultsQuery={useConstructorRacesResultsQuery}
      useQualifyingsResultsQuery={useConstructorQualifyingsResultsQuery}
    >
      <Information useInformation={useConstructorInformation} />

      {/* TODO - fallback */}
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

      {/* TODO - fallback */}
      <ErrorBoundary fallback={<>Fallback here</>}>
        <ConstructorSeasons />
      </ErrorBoundary>
    </ProfileContextProvider>
  )
}

export default ConstructorProfile
