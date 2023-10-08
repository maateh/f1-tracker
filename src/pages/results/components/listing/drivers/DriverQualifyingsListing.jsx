// hooks
import useDriverQualifyingsQuery from "./hooks/useDriverQualifyingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Cards from '../../../../../components/listing/cards/Cards'
import Table from '../../../../../components/listing/table/Table'
import ListingSkeleton from "../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from "../../../../../components/listing/context/hooks/useListingContext"

const DriverQualifyingListing = () => {
	const { title, cards, table } = useListingContext()
  const { isLoading } = useDriverQualifyingsQuery()

	return (
		<div className="listing__container">
			{isLoading ? (
				<ListingSkeleton
					titleRequired={true}
					cardsCounter={2}
					tableRequired={true}
				/>
			) : title && cards && table && (
				<>
					<Title title={title} />
					<Cards cards={cards} />
					<Table table={table} />
				</>
			)}
		</div>
	)
}

export default DriverQualifyingListing
