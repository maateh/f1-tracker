import { ErrorBoundary } from 'react-error-boundary'

// components
import Information from '../../components/information/Information'
import Achievements from '../../components/achievements/Achievements'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import ProfileListing from '../../components/listing/ProfileListing'
import ConstructorSeasonsListing from './components/listing/ConstructorSeasonsListing'

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
import useConstructorSeasonsListing from './components/listing/hooks/useConstructorSeasonsListing'

// context
import ProfileContextProvider from '../../context/ProfileContext'

const ConstructorProfile = () => {
  return (
    <ProfileContextProvider
      dataWithQueries={{
        info: useConstructorInfoQuery(),
        standingsList: useConstructorStandingsListQuery(),
        racesResults: useConstructorRacesResultsQuery(),
        qualifyingsResults: useConstructorQualifyingsResultsQuery()
      }}
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
            note="*Qualifying results are only fully supported from the 2003 season onwards"
            useStats={useConstructorQualifyingsStats}
          />
        </ErrorBoundary>
      </StatisticsHolder>

      <ErrorBoundary fallback={<></>}>
        <ProfileListing useListing={useConstructorSeasonsListing}>
          <ConstructorSeasonsListing />
        </ProfileListing>
      </ErrorBoundary>
    </ProfileContextProvider>
  )
}

export default ConstructorProfile
