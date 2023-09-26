// components
import DriverInformation from './components/information/DriverInformation'
import StatisticsHolder from '../../components/statistics/StatisticsHolder'
import Statistics from '../../components/statistics/Statistics'
import DriverSeasons from './components/seasons/DriverSeasons'

// hooks
import useDriverRacesStatsQuery from './components/stats/hooks/useDriverRacesStatsQuery'
import useDriverStandingsStatsQuery from './components/stats/hooks/useDriverStandingsStatsQuery'
import useDriverQualifyingsStatsQuery from './components/stats/hooks/useDriverQualifyingsStatsQuery'

// context
import DriverProfileContextProvider from './context/DriverProfileContext'

const DriverProfile = () => {
  return (
    <div className="driver-profile__container page__container">
      <DriverProfileContextProvider>
        <DriverInformation />
        <StatisticsHolder>
          <Statistics
            title="Races Statistics"
            useStatsQuery={useDriverRacesStatsQuery}
          />
          <Statistics
            title="Standings Statistics"
            note="*Always updated at the end of the season"
            useStatsQuery={useDriverStandingsStatsQuery}
          />
          <Statistics
            title="Qualifyings Statistics"
            useStatsQuery={useDriverQualifyingsStatsQuery}
          />
        </StatisticsHolder>
        <DriverSeasons />
      </DriverProfileContextProvider>
    </div>
  )
}

export default DriverProfile
