// hooks
import { useDriverPitsQuery } from "./hooks/useDriverPitsQuery"

// components
import Listing from "../../../../../../components/listing/Listing"

const DriverPitsListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriverPitsQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default DriverPitsListing
