import { useQuery } from 'react-query'

// components
import SeasonPicker from "./picker/SeasonPicker"
import SkeletonSelector from "../../../../components/skeleton/SkeletonSelector"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// model
import FilterModel from '../../../../model/filter/Filter'

// styles
import './SeasonSelector.css'

const SeasonSelector = () => {
  const { seasons, dispatch } = useScheduleContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['filter', 'seasonList'],
    queryFn: FilterModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data })
  })

  return (
    <div className="season-selector">
      {isLoading && <SkeletonSelector counter={3} />}
      {isError && <p className="error__element">{error}</p>}

      {seasons && <SeasonPicker />}
    </div>
  )
}

export default SeasonSelector