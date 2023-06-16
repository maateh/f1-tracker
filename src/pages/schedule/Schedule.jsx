import { useEffect } from "react";

// components
import SeasonSelector from "./selector/SeasonSelector";
import ScheduleInfo from "./info/ScheduleInfo";

// context
import { useScheduleContext } from "./context/hooks/useScheduleContext"

// model
import SeasonModel from "../../model/season/Season";

// styles
import './Schedule.css'

const Schedule = () => {
  const { schedule, year, loading, error, dispatch } = useScheduleContext()
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE_START' })
    SeasonModel.fetch(`/${year}`)
      .then(data => dispatch({ type: 'FETCH_SCHEDULE_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SCHEDULE_ERROR', payload: err.message }))
  }, [year, dispatch])

  return (
    <main className="schedule__container">
      <h1 className="page__title">Season Schedule</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {schedule && <SeasonSelector />}
      {schedule && <ScheduleInfo />}
    </main>
  )
}
export default Schedule


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint