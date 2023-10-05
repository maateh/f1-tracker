import { useCallback, useRef } from 'react'

const useObserver = ({ isFetchingNextPage, fetchNextPage, hasNextPage }) => {
	const observer = useRef()

	return useCallback(element => {
    if (isFetchingNextPage) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(elements => {
      if (elements[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (element) observer.current.observe(element)
  }, [isFetchingNextPage, fetchNextPage, hasNextPage])
}

export default useObserver
