import { useCallback, useRef } from 'react'

const useObserver = ({ isFetchingNextPage, fetchNextPage, hasNextPage }) => {
	const observer = useRef()

	return useCallback(card => {
    if (isFetchingNextPage) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(cards => {
      if (cards[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (card) observer.current.observe(card)
  }, [isFetchingNextPage, fetchNextPage, hasNextPage])
}

export default useObserver
