import { useQuery } from "react-query"

// components
import RelevantWeekend from "./weekend/RelevantWeekend"
import RelevantSession from "./session/RelevantSession"
import SkeletonGrid from "../../../components/skeleton/SkeletonGrid"
import Error from "../../../components/error/Error"

// context
import { useWeekendContext } from "../context/hooks/useWeekendContext"

// model
import WeekendModel from "../../../model/season/weekend/Weekend"

// styles
import './HomeContent.css'

const HomeContent = () => {
  const { weekend, dispatch } = useWeekendContext()
  const weekendQuery = useQuery({
    queryKey: ['nextRound'],
    queryFn: WeekendModel.query,
    onSuccess: data => dispatch({ type: 'SET', payload: data })
  })

  return (
    <div className="home-content">
      {weekendQuery.isLoading && <SkeletonGrid counter={2} />}
      {weekendQuery.isError && <Error error={weekendQuery.error} />}

      {weekend && (
        <>
          <RelevantWeekend />
          <RelevantSession />
        </>
      )}
    </div>
  )
}

export default HomeContent