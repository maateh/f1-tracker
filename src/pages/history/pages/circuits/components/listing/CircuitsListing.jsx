// hooks
import useCircuitsListingQuery from "./hooks/useCircuitsListingQuery"
import useObserver from "../../../../../../components/listing/cards/hooks/useObserver"

// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"
import LoadingSkeleton from "../../../../../../components/skeletons/loading/LoadingSkeleton"

// context
import useListingContext from '../../../../../../components/listing/context/hooks/useListingContext'

const CircuitsListing = () => {
	const { title, cards } = useListingContext()
	const {
    data,
    fetchNextPage,
    hasNextPage,
		isFetchingNextPage
  } = useCircuitsListingQuery()

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

export default CircuitsListing
