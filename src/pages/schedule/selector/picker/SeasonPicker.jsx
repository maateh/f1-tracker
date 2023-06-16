import Select from "react-select"

// hooks
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// styles
import './SeasonPicker.css'

const SeasonPicker = () => {
  const { seasons, dispatch } = useScheduleContext()
  
  return (
    <div className="season-picker">
      <Select
        onChange={season => dispatch({ type: 'SET_YEAR', payload: season.value })}
        options={seasons.getForSelect()}
        isSearchable={true}
      />
    </div>
  )
}

export default SeasonPicker