// hooks
import useConstructorStandingsQuery from "./hooks/useConstructorStandingsQuery"

// components
import Title from '../../../../../components/listing/title/Title'
import Table from '../../../../../components/listing/table/Table'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

// context
import useListingContext from "../../../../../components/listing/context/hooks/useListingContext"

const ConstructorStandingsListing = () => {
	const { title, table } = useListingContext()
  const {
    isLoading,
    isError,
    error
  } = useConstructorStandingsQuery()

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

export default ConstructorStandingsListing
