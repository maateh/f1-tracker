import { useQuery } from 'react-query'

// components
import FilterSelector from "./selector/FilterSelector"
import SkeletonSelector from "../../../../components/skeleton/SkeletonSelector"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// model
import FilterModel from '../../../../model/filter/Filter'

// styles
import './ScheduleFilter.css'

const ScheduleFilter = () => {
  const { seasons, dispatch } = useScheduleContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['filter', 'seasonList'],
    queryFn: FilterModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data })
  })

  return (
    <div className="schedule-filter">
      {isLoading && <SkeletonSelector counter={1} />}

      {seasons && <FilterSelector />}

      {isError && <p className="error__element">{error}</p>}
    </div>
  )
}

export default ScheduleFilter
