// hooks
import useRoundPitsQuery from "./hooks/useRoundPitsQuery"

// components
import Title from '../../../../../../components/listing/title/ListingTitle'
import Cards from '../../../../../../components/listing/cards/ListingCards'
import Table from '../../../../../../components/listing/table/ListingTable'
import LoadingHandler from '../../../../../../components/loading/LoadingHandler'

const RoundPitsListing = () => {
	const { 
    data: listing,
    isLoading,
    isError,
    error
  } = useRoundPitsQuery()

	return (
		<div className="listing__container">
			<LoadingHandler
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>

			{listing && (
				<>
					<Title title={listing.title} />
					<Cards cards={listing.cards} />
					<Table table={listing.table} />
				</>
			)}
		</div>
	)
}

export default RoundPitsListing
