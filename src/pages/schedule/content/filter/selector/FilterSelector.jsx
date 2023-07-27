import Select from "react-select"

// context
import { useScheduleContext } from "../../../context/hooks/useScheduleContext"

const SeasonSelector = () => {
  const { seasons, dispatch } = useScheduleContext()
  
  return (
    <div className="filter-selector">
      <h2 className="page__subtitle">Select a Season</h2>
      <Select
        onChange={season => dispatch({ type: 'SET_YEAR', payload: season.value })}
        options={seasons.options}
        isSearchable={true}
      />
    </div>
  )
}

export default SeasonSelector
