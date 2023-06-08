import { useEffect, useState } from "react";

// components
import ScheduleSelector from "./ScheduleSelector";
import ScheduleInfo from "./ScheduleInfo";

// hooks
import { useScheduleContext } from "../../hooks/useScheduleContext"
import { useFetch } from "../../hooks/useFetch";

// styles
import './Schedule.css'

const Schedule = () => {
  const { schedule, dispatch } = useScheduleContext()

  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const { data, isPending, error } = useFetch(`/${year}`, 'RaceTable')

  useEffect(() => {
    dispatch({ type: 'SET_SCHEDULE', payload: data })
  }, [data, dispatch, year])

  return (
    <main className="schedule__container">
      <h1 className="page__title">Season Schedule</h1>

      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ScheduleSelector year={year} setYear={setYear} />

      {schedule && (
        <ScheduleInfo data={schedule} />
      )}
    </main>
  )
}
export default Schedule


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint