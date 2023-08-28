// hooks
import useRoundPitsQuery from "./hooks/useRoundPitsQuery"

// components
import Listing from "../../../../../../components/listing/Listing"

const RoundPitsListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useRoundPitsQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default RoundPitsListing
