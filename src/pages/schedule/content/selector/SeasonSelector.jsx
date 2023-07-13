import { useQuery } from 'react-query'

// components
import SeasonPicker from "./picker/SeasonPicker"
import SkeletonSelector from "../../../../components/skeleton/SkeletonSelector"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// model
import FilterOptionsModel from '../../../../model/filter/FilterOptions'

// styles
import './SeasonSelector.css'

const SeasonSelector = () => {
  const { seasons, dispatch } = useScheduleContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['seasonList'],
    queryFn: FilterOptionsModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data })
  })

  return (
    <div className="season-selector">
      {isLoading && <SkeletonSelector />}
      {isError && <p className="error__element">{error}</p>}

      {seasons && <SeasonPicker />}
    </div>
  )
}

export default SeasonSelector