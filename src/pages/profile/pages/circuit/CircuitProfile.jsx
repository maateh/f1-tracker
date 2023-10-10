// components
import Information from '../../components/information/Information'
import ProfileListing from '../../components/listing/ProfileListing'
import CircuitRacesListing from './components/listing/CircuitRacesListing'

// hooks
import useCircuitInfoQuery from './hooks/useCircuitInfoQuery'
import useCircuitRacesQuery from './hooks/useCircuitRacesQuery'

import useCircuitInformation from './components/information/hooks/useCircuitInformation'
import useCircuitRacesListing from './components/listing/hooks/useCircuitRacesListing'

// context
import ProfileContextProvider from '../../context/ProfileContext'

const CircuitProfile = () => {
  return (
    <ProfileContextProvider
      dataWithQueries={{
        info: useCircuitInfoQuery(),
        weekends: useCircuitRacesQuery()
      }}
    >
      <Information useInformation={useCircuitInformation} />
      <ProfileListing useListing={useCircuitRacesListing}>
        <CircuitRacesListing />
      </ProfileListing>
    </ProfileContextProvider>
  )
}

export default CircuitProfile
