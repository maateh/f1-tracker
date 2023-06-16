import { useEffect } from "react"

// components
import SeasonPicker from "./SeasonPicker"

// hooks
import { useScheduleContext } from "../../../hooks/useScheduleContext"

// model
import SeasonList from "../../../model/season/SeasonList"

// styles
import './ScheduleSelector.css'

const ScheduleSelector = () => {
  const { seasons, loading, error, dispatch } = useScheduleContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_SEASONS_START' })
    SeasonList.fetch('/seasons')
      .then(data => dispatch({ type: 'FETCH_SEASONS_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SEASONS_ERROR', payload: err.message }))
  }, [dispatch])

  return (
    <div className="schedule-selector">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {seasons && <SeasonPicker />}
    </div>
  )
}

export default ScheduleSelector