import { useQuery } from "react-query"

// components
import RelevantWeekend from "./components/weekend/RelevantWeekend"
import RelevantSession from "./components/session/RelevantSession"
import SkeletonGrid from "../../components/skeleton/SkeletonGrid"
import Error from "../../components/error/Error"

// context
import { useWeekendContext } from "./context/hooks/useWeekendContext"

// models
import WeekendModel from "../../model/season/weekend/Weekend"

// styles
import './Home.css'

const HomeContent = () => {
  const { weekend, dispatch } = useWeekendContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['nextRound'],
    queryFn: WeekendModel.queryNext,
    onSuccess: data => dispatch({ type: 'SET', payload: data })
  })

  return (
    <div className="home-content">
      {isLoading && <SkeletonGrid counter={2} />}
      {isError && <Error error={error} />}

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
