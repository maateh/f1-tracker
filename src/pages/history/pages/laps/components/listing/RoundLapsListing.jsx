// components
import Title from '../../../../../../components/listing/title/Title'
import Cards from '../../../../../../components/listing/cards/Cards'
import Table from '../../../../../../components/listing/table/Table'
import Pagination from "../../../../../../components/listing/pagination/Pagination"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"

// hooks
import useRoundLapsListingQuery from "./hooks/useRoundLapsListingQuery"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const RoundLapsListing = () => {
	const { title, cards, table, pagination } = useListingContext()
	const { isLoading } = useRoundLapsListingQuery()

	return (
		<div className="listing__container">
			{isLoading ? (
				<ListingSkeleton
					titleRequired={true}
					cardsCounter={1}
					tableRequired={true}
				/>
			) : title && cards && table && (
				<>
					<Title title={title} />
					<Cards cards={cards} />
					<Table table={table} />
					<Pagination pages={pagination.pageQuantity} />
				</>
			)}
		</div>
	)
}

export default RoundLapsListing
