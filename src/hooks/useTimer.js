import { intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'

// TODO
// mi van akkor, ha egy verseny véget ér - ugyanis nem lesz további referencia idő

export const useTimer = (start, end) => {
  // console.log('START_DATE: ', start())
  // console.log('END_DATE: ', end())
	const [duration, setDuration] = useState(intervalToDuration({ start: start(), end }))

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDuration(
				intervalToDuration({ start: start(), end })
			)
			// console.log(duration)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [duration, start, end])

	return { duration }
}
