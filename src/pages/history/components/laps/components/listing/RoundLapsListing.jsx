// hooks
import useRoundLapsQuery from "./hooks/useRoundLapsQuery"

// components
import Title from '../../../../../../components/listing/title/ListingTitle'
import Cards from '../../../../../../components/listing/cards/ListingCards'
import Table from '../../../../../../components/listing/table/ListingTable'
import Pagination from "../../../../../../components/listing/pagination/Pagination"
import LoadingHandler from '../../../../../../components/loading/LoadingHandler'

const RoundLapsListing = () => {
	const { 
    data: listing,
    isLoading,
    isError,
    error
  } = useRoundLapsQuery()

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
					<Pagination pages={listing.pagination.pageQuantity} />
				</>
			)}
		</div>
	)
}

export default RoundLapsListing
