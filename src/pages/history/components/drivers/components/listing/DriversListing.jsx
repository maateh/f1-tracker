import React, { useCallback, useRef } from "react"

// hooks
import useDriversQuery from "./hooks/useDriversQuery"

// components
import Title from "../../../../../../components/listing/title/ListingTitle"
import Cards from "../../../../../../components/listing/cards/ListingCards"
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

const DriversListing = () => {
	const { 
    data,
    fetchNextPage,
    hasNextPage,
		isFetchingNextPage,
		isError,
    error
  } = useDriversQuery()

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
				isLoading={isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</div>
	)
}

export default DriversListing
