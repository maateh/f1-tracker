// hooks
import useDriverLapsQuery from './hooks/useDriverLapsQuery'

// components
import Listing from '../../../../../../components/listing/Listing'

const DriverLapsListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriverLapsQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default DriverLapsListing
