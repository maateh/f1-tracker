import { useCallback, useRef } from "react"

// hooks
import useCircuitsQuery from "./hooks/useCircuitsQuery"

// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

const CircuitsListing = () => {
	const { 
    data,
    fetchNextPage,
    hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
    error
  } = useCircuitsQuery()

	const observer = useRef()
	const lastRef = useCallback(card => {
		if (isFetchingNextPage) return
		if (observer.current) observer.current.disconnect()

		observer.current = new IntersectionObserver(cards => {
			if (cards[0].isIntersecting && hasNextPage) {
				fetchNextPage()
			}
		})
		
		if (card) observer.current.observe(card)
	}, [isFetchingNextPage, fetchNextPage, hasNextPage])

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

export default CircuitsListing
