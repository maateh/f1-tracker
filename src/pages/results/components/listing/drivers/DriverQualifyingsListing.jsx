// hooks
import useDriverQualifyingsQuery from "./hooks/useDriverQualifyingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Cards from '../../../../../components/listing/cards/Cards'
import Table from '../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

const DriverQualifyingListing = () => {
  const {
    data: listing,
    isLoading,
    isError,
    error
  } = useDriverQualifyingsQuery()

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
					<Cards cards={listing.cards} />
					<Table table={listing.table} />
				</>
			)}
		</div>
	)
}

export default DriverQualifyingListing
