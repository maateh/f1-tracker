// hooks
import useDriverStandingsQuery from "./hooks/useDriverStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

// context
import useListingContext from '../../../../../components/listing/context/hooks/useListingContext'

const DriverStandingsListing = () => {
	const { title, table } = useListingContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverStandingsQuery()

	return (
		<div className="listing__container">
			{isLoading || isError ? (
				<LoadingHandler
					isLoading={isLoading}
					isError={isError}
					error={error}
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
