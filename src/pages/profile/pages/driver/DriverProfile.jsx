import { ErrorBoundary } from 'react-error-boundary'

// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import DriverSeasons from './components/seasons/DriverSeasons'

// hooks
import useDriverQuery from './hooks/useDriverQuery'
import useDriverStandingsListQuery from './hooks/useDriverStandingsListQuery'
import useDriverRacesQuery from './hooks/useDriverRacesQuery'
import useDriverQualifyingsQuery from './hooks/useDriverQualifyingsQuery'

import useDriverInformation from './components/information/hooks/useDriverInformation'
import useDriverAchievements from './components/achievements/hooks/useDriverAchievements'
import useDriverRacesStats from './components/stats/hooks/useDriverRacesStats'
import useDriverStandingsStats from './components/stats/hooks/useDriverStandingsStats'
import useDriverQualifyingsStats from './components/stats/hooks/useDriverQualifyingsStats'

// context
import ProfileContextProvider from '../../context/ProfileContext'

const DriverProfile = () => {
  return (
    <ProfileContextProvider
      useInfoQuery={useDriverQuery}
      useStandingsListQuery={useDriverStandingsListQuery}
      useRacesResultsQuery={useDriverRacesQuery}
      useQualifyingsResultsQuery={useDriverQualifyingsQuery}
    >
      <Information useInformation={useDriverInformation} />

      {/* TODO - fallback */}
      <ErrorBoundary fallback={<>Fallback here</>}>
        <Achievements useAchievements={useDriverAchievements} />
      </ErrorBoundary>

      <StatisticsHolder>
        <ErrorBoundary fallback={<></>}>
          <Statistics
            title="Races Statistics"
            useStats={useDriverRacesStats}
          />
        </ErrorBoundary>
        <ErrorBoundary fallback={<></>}>
          <Statistics
            title="Standings Statistics"
            note="*Always updated at the end of the current season"
            useStats={useDriverStandingsStats}
          />
        </ErrorBoundary>
        <ErrorBoundary fallback={<></>}>
          <Statistics
            title="Qualifyings Statistics"
            useStats={useDriverQualifyingsStats}
          />
        </ErrorBoundary>
      </StatisticsHolder>

      {/* TODO - fallback */}
      <ErrorBoundary fallback={<>Fallback here</>}>
        <DriverSeasons />
      </ErrorBoundary>
    </ProfileContextProvider>
  )
}

export default DriverProfile
