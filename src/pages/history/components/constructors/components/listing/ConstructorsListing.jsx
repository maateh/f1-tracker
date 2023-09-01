// hooks
import useConstructorsQuery from "./hooks/useConstructorsQuery"

// components
import Listing from "../../../../../../components/listing/Listing"

const ConstructorsListing = () => {
	const { 
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useConstructorsQuery()

	return (
		<Listing 
			listing={listing}
			loading={loading}
			isError={isError}
			error={error}
		/>
	)
}

export default ConstructorsListing
