// hooks
import useDriverStandingsQuery from "./hooks/useDriverStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import ListingSkeleton from "../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from '../../../../../components/listing/context/hooks/useListingContext'

const DriverStandingsListing = () => {
	const { title, table } = useListingContext()
  const {
    isLoading,
    isError
  } = useDriverStandingsQuery()

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

export default DriverStandingsListing
