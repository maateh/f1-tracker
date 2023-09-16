// hooks
import useDriverPitsQuery from "./hooks/useDriverPitsQuery"

// components
import Title from '../../../../../../components/listing/title/Title'
import Cards from '../../../../../../components/listing/cards/Cards'
import Table from '../../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../../components/loading/LoadingHandler'

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const DriverPitsListing = () => {
	const { title, cards, table } = useListingContext()
	const { 
    isLoading,
    isError,
    error
  } = useDriverPitsQuery()

	return (
		<div className="listing__container">
			<LoadingHandler
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>

			{title && cards && table && (
				<>
					<Title title={title} />
					<Cards cards={cards} />
					<Table table={table} />
				</>
			)}
		</div>
	)
}

export default DriverPitsListing
