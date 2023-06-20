import Select from "react-select"

// context
import { useScheduleContext } from "../../../context/hooks/useScheduleContext"

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