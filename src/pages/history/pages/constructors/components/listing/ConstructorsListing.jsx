// hooks
import useConstructorsListingQuery from "./hooks/useConstructorsListingQuery"
import useObserver from "../../../../../../components/listing/cards/components/card/hooks/useObserver"

// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"
import LoadingSkeleton from "../../../../../../components/skeletons/loading/LoadingSkeleton"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const ConstructorsListing = () => {
	const { title, cards } = useListingContext()
	const { 
    data,
    fetchNextPage,
    hasNextPage,
		isFetchingNextPage
  } = useConstructorsListingQuery()

	const lastRef = useObserver({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	return (
		<div className="listing__container">
			{title && cards && data ? (
				<>
					<Title title={title} />
					<Cards
						cards={cards}
						lastIndex={data.pages[data.pages.length - 1].limit}
						lastRef={lastRef}
					/>
				</>
			) : (
				<ListingSkeleton
					titleRequired={true}
					cardsCounter={9}
				/>
			)}

			{isFetchingNextPage && (
				<LoadingSkeleton linear={true} />
			)}
		</div>
	)
}

export default ConstructorsListing
