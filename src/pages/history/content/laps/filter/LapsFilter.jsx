import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// components
import LapsFilterSelector from "./selector/LapsFilterSelector"
import SkeletonSelector from "../../../../../components/skeleton/SkeletonSelector"

// context
import { useLapsFilterContext } from "./context/hooks/useLapsFilterContext"
import FilterModel from "../../../../../model/filter/Filter"

const LapsFilter = () => {
  const { seasons, rounds, drivers, dispatch } = useLapsFilterContext()
  const { year } = useParams()

	const { isLoading: seasonsLoading, isError, error } = useQuery({
    queryKey: ['filter', 'seasonList'],
    queryFn: FilterModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data }),
  })

  const { isLoading: roundsLoading } = useQuery({
    queryKey: ['filter', 'roundList', year],
    queryFn: () => FilterModel.queryRounds(year),
    onSuccess: data => dispatch({ type: 'SET_ROUNDS', payload: data }),
  })

  const { isLoading: driversLoading } = useQuery({
    queryKey: ['filter', 'driverList', year],
    queryFn: () => FilterModel.queryDrivers(year),
    onSuccess: data => dispatch({ type: 'SET_DRIVERS', payload: data }),
  })

  return (
    <div>
      {seasonsLoading && <SkeletonSelector counter={3} />}

      {seasons && rounds && drivers && <LapsFilterSelector loading={roundsLoading || driversLoading} />}

      {isError && <p className="error__element">{error.message}</p>}
    </div>
  )
}

export default LapsFilter
