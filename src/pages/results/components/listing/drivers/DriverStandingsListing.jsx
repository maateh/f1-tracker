// hooks
import useDriverStandingsQuery from "./hooks/useDriverStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

const DriverStandingsListing = () => {
  const {
    data: listing,
    isLoading,
    isError,
    error
  } = useDriverStandingsQuery()

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
					<Table table={listing.table} />
				</>
			)}
		</div>
	)
}

export default DriverStandingsListing
