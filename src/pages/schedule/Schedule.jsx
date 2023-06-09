import { useReducer, useState } from "react";

// components
import ScheduleSelector from "./ScheduleSelector";
import ScheduleInfo from "./ScheduleInfo";

// hooks
import { INITIAL_DATA_STATE, useDataReducer } from "../../hooks/useDataReducer";
import { useFetchWithDispatch } from "../../hooks/useFetchWithDispatch";

// styles
import './Schedule.css'

const Schedule = () => {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)

  const [state, dispatch] = useReducer(useDataReducer, INITIAL_DATA_STATE)
  useFetchWithDispatch(dispatch, `/${year}`, 'RaceTable')

  return (
    <main className="schedule__container">
      <h1 className="page__title">Season Schedule</h1>

      {state.loading && <p className="loading">Loading...</p>}
      {state.error && <p className="error">{state.error}</p>}

      <ScheduleSelector setYear={setYear} />
      {state.data && <ScheduleInfo data={state.data} />}
    </main>
  )
}
export default Schedule


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint