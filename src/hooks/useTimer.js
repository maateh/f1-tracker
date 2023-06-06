import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

// TODO
// ha belépünk az adott session-be, akkor a session idejét számolja vissza (?!)
// logikailag ez nem okozhat problémát, azonban azt kéne megnézni, 
// mi van akkor, ha egy verseny véget ér - ugyanis nem lesz további referencia idő

export const useTimer = (end) => {
  const start = Date.now()
  const [duration, setDuration] = useState(
    intervalToDuration({ start, end })
  )
  
  useEffect(() => {
    const start = Date.now()
		const intervalId = setInterval(() => {
      setDuration(
        intervalToDuration({ start, end })
      )
      console.log(duration)
    }, 1000)

    return () => clearInterval(intervalId)
	}, [duration, end])

  return { duration }
}
