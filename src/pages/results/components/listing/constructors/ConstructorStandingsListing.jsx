// hooks
import useConstructorStandingsQuery from "./hooks/useConstructorStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

const ConstructorStandingsListing = () => {
  const {
    data: listing,
    isLoading,
    isError,
    error
  } = useConstructorStandingsQuery()

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

export default ConstructorStandingsListing
