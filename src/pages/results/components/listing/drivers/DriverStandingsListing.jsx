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
  const { isLoading } = useDriverStandingsQuery()

	return (
		<div className="listing__container">
			{isLoading ? (
				<ListingSkeleton
					titleRequired={true}
					tableRequired={true}
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
