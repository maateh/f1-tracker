// hooks
import useConstructorStandingsQuery from "./hooks/useConstructorStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import ListingSkeleton from "../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from "../../../../../components/listing/context/hooks/useListingContext"

const ConstructorStandingsListing = () => {
	const { title, table } = useListingContext()
  const {
    isLoading,
    isError
  } = useConstructorStandingsQuery()

	return (
		<div className="listing__container">
			{isLoading || isError ? (
				<ListingSkeleton
					titleRequired={true}
					// tableColumnsCounter={4}
					// tableRowsCounter={10}
				/>
			) : title && table && (
				<>
					<Title title={title} />
					<Table table={table} />
				</>
			)}
		</div>
	)
}

export default ConstructorStandingsListing
