// hooks
import useConstructorRacesQuery from "./hooks/useConstructorRacesQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Cards from '../../../../../components/listing/cards/Cards'
import Table from '../../../../../components/listing/table/Table'
import ListingSkeleton from "../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from "../../../../../components/listing/context/hooks/useListingContext"

const ConstructorRacesListing = () => {
	const { title, cards, table } = useListingContext()
  const {
    isLoading,
    isError
  } = useConstructorRacesQuery()

	return (
		<div className="listing__container">
			{isLoading || isError ? (
				<ListingSkeleton
					titleRequired={true}
					cardsCounter={3}
					// tableColumnsCounter={4}
					// tableRowsCounter={10}
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

export default ConstructorRacesListing
