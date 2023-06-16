import { intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'

// TODO
// mi van akkor, ha egy verseny véget ér - ugyanis nem lesz további referencia idő

export const useTimer = (end) => {
  // console.log('END_DATE: ', end)
	const [duration, setDuration] = useState(intervalToDuration({ start: Date.now(), end }))

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDuration(
				intervalToDuration({ start: Date.now(), end })
			)
			// console.log(duration)
		}, 1000)

		Object.values(duration).every(item => item === 0) && clearInterval(intervalId)
		
		return () => clearInterval(intervalId)
	}, [duration, end])

	return { duration }
}
