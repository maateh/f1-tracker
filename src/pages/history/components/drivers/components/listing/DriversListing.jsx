// hooks
import useDriversQuery from "./hooks/useDriversQuery"

// components
import Listing from "../../../../../../components/listing/Listing"

const DriversListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriversQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default DriversListing
