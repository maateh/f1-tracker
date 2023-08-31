import { useEffect } from 'react'
import { intervalToDuration } from 'date-fns'

export const useTimer = ({ duration, setDuration }) => {
	useEffect(() => {
		const intervalId = setInterval(() => {
			setDuration(prev => prev - 1000)
		}, 1000)

		if (duration <= 0) clearInterval(intervalId)
		return () => clearInterval(intervalId)
	}, [duration, setDuration])

	return {
		isOver: duration <= 0,
		...intervalToDuration({ start: 0, end: duration })
	}
}
