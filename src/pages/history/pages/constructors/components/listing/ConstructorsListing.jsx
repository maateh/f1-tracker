// hooks
import useConstructorsQuery from "./hooks/useConstructorsQuery"
import useObserver from "../../../../../../components/listing/cards/hooks/useObserver"

// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const ConstructorsListing = () => {
	const { title, cards } = useListingContext()
	const { 
    data,
    fetchNextPage,
    hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
    error
  } = useConstructorsQuery()

	const lastRef = useObserver({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	return (
		<div className="listing__container">
			{title && cards && data && (
				<>
					<Title title={title} />
					<Cards
						cards={cards}
						lastIndex={data.pages[data.pages.length - 1].limit}
						lastRef={lastRef}
					/>
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

export default ConstructorsListing
