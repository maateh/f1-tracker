import { useEffect } from "react";

// components
import ScheduleSelector from "./selector/ScheduleSelector";
import ScheduleInfo from "./ScheduleInfo";

// hooks
import { useScheduleContext } from "../../hooks/useScheduleContext"

// model
import ScheduleModel from "../../model/schedule/Schedule";

// styles
import './Schedule.css'

const Schedule = () => {
  const { schedule, year, loading, error, dispatch } = useScheduleContext()
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE_START' })
    ScheduleModel.fetch(`/${year}`)
      .then(data => dispatch({ type: 'FETCH_SCHEDULE_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SCHEDULE_ERROR', payload: err.message }))
  }, [year, dispatch])

  return (
    <main className="schedule__container">
      <h1 className="page__title">Season Schedule</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {schedule && <ScheduleSelector />}
      {schedule && <ScheduleInfo />}
    </main>
  )
}
export default Schedule


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint