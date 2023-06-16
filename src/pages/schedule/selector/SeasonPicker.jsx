import Select from "react-select"

// hooks
import { useScheduleContext } from "../../../hooks/useScheduleContext"

// styles
import './SeasonPicker.css'

const SeasonPicker = () => {
  const { seasons, dispatch } = useScheduleContext()
  return (
    <div className="season-picker">
      <h2 className="page__subtitle">Select a Season</h2>
      <Select
        onChange={season => dispatch({ type: 'SET_YEAR', payload: season.value })}
        options={seasons.getForSelect()}
        isSearchable={true}
      />
    </div>
  )
}

export default SeasonPicker