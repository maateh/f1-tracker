// hooks
import { useRoundLapsQuery } from "./hooks/useRoundLapsQuery"

// components
import Listing from "../../../../../../components/listing/Listing"

const RoundLapsListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useRoundLapsQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default RoundLapsListing
