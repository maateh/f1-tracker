import { ErrorBoundary } from 'react-error-boundary'

// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ProfileListing from '../../components/listing/ProfileListing'
import DriverSeasonsListing from './components/listing/DriverSeasonsListing'

// hooks
import useDriverInfoQuery from './hooks/useDriverInfoQuery'
import useDriverStandingsListQuery from './hooks/useDriverStandingsListQuery'
import useDriverRacesResultsQuery from './hooks/useDriverRacesResultsQuery'
import useDriverQualifyingsResultsQuery from './hooks/useDriverQualifyingsResultsQuery'

import useDriverInformation from './components/information/hooks/useDriverInformation'
import useDriverAchievements from './components/achievements/hooks/useDriverAchievements'
import useDriverRacesStats from './components/stats/hooks/useDriverRacesStats'
import useDriverStandingsStats from './components/stats/hooks/useDriverStandingsStats'
import useDriverQualifyingsStats from './components/stats/hooks/useDriverQualifyingsStats'
import useDriverSeasonsListing from './components/listing/hooks/useDriverSeasonsListing'

// context
import ProfileContextProvider from '../../context/ProfileContext'

const DriverProfile = () => {
  return (
    <ProfileContextProvider
      useInfoQuery={useDriverInfoQuery}
      useStandingsListQuery={useDriverStandingsListQuery}
      useRacesResultsQuery={useDriverRacesResultsQuery}
      useQualifyingsResultsQuery={useDriverQualifyingsResultsQuery}
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

      <ErrorBoundary fallback={<></>}>
        <ProfileListing useListing={useDriverSeasonsListing}>
          <DriverSeasonsListing />
        </ProfileListing>
      </ErrorBoundary>
    </ProfileContextProvider>
  )
}

export default DriverProfile
