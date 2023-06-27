import { useEffect } from "react"
import { useParams } from "react-router-dom"

// components
import Error from "../../../error/Error"

// context
import { useResultsListingContext } from "./context/hooks/useResultsListingContext"

// model
import ResultListModel from "../../../../model/result/ResultList"
import { CircularProgress } from "@mui/material"

const Weekend = () => {
  const params = useParams()
  const { weekend, loading, error, dispatch } = useResultsListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_WEEKEND_START' })
    ResultListModel.fetchWeekend(`/${params.year}/${params.weekend}/results`)
      .then(data => dispatch({ type: 'FETCH_WEEKEND_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_WEEKEND_ERROR', payload: err }))
  }, [params.year, params.weekend, dispatch])

  return (
    <div className="results-listing__seasons">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {weekend && (
        <div key={weekend.round}>
          <span>Round: {weekend.round} - </span>
          <span>Weekend: {weekend.name}</span>
        </div>
      )}
    </div>
  )
}

export default Weekend