// hooks
import useRoundLapsListingQuery from "./hooks/useRoundLapsListingQuery"

// components
import Title from '../../../../../../components/listing/title/Title'
import Cards from '../../../../../../components/listing/cards/Cards'
import Table from '../../../../../../components/listing/table/Table'
import Pagination from "../../../../../../components/listing/pagination/Pagination"
import LoadingHandler from '../../../../../../components/loading/LoadingHandler'

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const RoundLapsListing = () => {
	const { title, cards, table, pagination } = useListingContext()
	const {
    isLoading,
    isError,
    error
  } = useRoundLapsListingQuery()

	return (
		<div className="listing__container">
			<LoadingHandler
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>

			{title && cards && table && pagination && (
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
