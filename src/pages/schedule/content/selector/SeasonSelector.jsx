import { useEffect } from "react"

// components
import SeasonPicker from "./picker/SeasonPicker"
import LoadingSelector from "../../../../components/loading/selector/LoadingSelector"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// model
import SeasonListModel from "../../../../model/season/SeasonList"

// styles
import './SeasonSelector.css'

const SeasonSelector = () => {
  const { seasons, loading, error, dispatch } = useScheduleContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_SEASONS_START' })
    SeasonListModel.fetch('/seasons')
    .then(data => dispatch({ type: 'FETCH_SEASONS_SUCCESS', payload: data }))
    .catch(err => dispatch({ type: 'FETCH_SEASONS_ERROR', payload: err.message }))
  }, [dispatch])

  return (
    <div className="season-selector">
      {loading && !seasons && <LoadingSelector />}
      {error && <p className="error__element">{error}</p>}

      {seasons && <SeasonPicker />}
    </div>
  )
}

export default SeasonSelector