import { useQuery } from 'react-query'

// components
import SeasonPicker from "./picker/SeasonPicker"
import SkeletonSelector from "../../../../components/skeleton/SkeletonSelector"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// model
import SeasonListModel from "../../../../model/season/SeasonList"

// styles
import './SeasonSelector.css'

const SeasonSelector = () => {
  const { seasons, dispatch } = useScheduleContext()
  const seasonsQuery = useQuery({
    queryKey: ['seasonList'],
    queryFn: SeasonListModel.query,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data })
  })

  return (
    <div className="season-selector">
      {seasonsQuery.isLoading && <SkeletonSelector />}
      {seasonsQuery.isError && <p className="error__element">{seasonsQuery.error}</p>}

      {seasons && <SeasonPicker />}
    </div>
  )
}

export default SeasonSelector