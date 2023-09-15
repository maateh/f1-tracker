// hooks
import useDriversQuery from "./hooks/useDriversQuery"
import useObserver from "../../../../../../components/listing/cards/hooks/useObserver"

// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

const DriversListing = () => {
	const { 
    data,
    fetchNextPage,
    hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
    error
  } = useDriversQuery()

	const lastRef = useObserver({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	return (
		<div className="listing__container">
			{data?.pages && data.pages.length && (
				<>
					<Title title={data.pages[0].title} />

					{data.pages.map(page => (
						<Cards
							key={page.pagination.currentPage}
							cards={page.cards}
							lastIndex={page.pagination.limit}
							lastRef={lastRef}
						/>
					))}
				</>
			)}

			<LoadingHandler
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</div>
	)
}

export default DriversListing
