import { useEffect } from "react"

// components
import RelevantWeekend from "./weekend/RelevantWeekend"
import RelevantSession from "./session/RelevantSession"
import LoadingHome from "../loading/LoadingHome"
import Error from "../../error/Error"

// context
import { useWeekendContext } from "../context/hooks/useWeekendContext"

// model
import WeekendModel from "../../../model/season/weekend/Weekend"

// styles
import './HomeContent.css'

const HomeContent = () => {
  const { weekend, loading, error, dispatch } = useWeekendContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    WeekendModel.fetch('/current/next')
    .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
    .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }))
  }, [dispatch])

  return (
    <div className="home-content">
      {loading && <LoadingHome />}
      {error && <Error error={error} />}

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