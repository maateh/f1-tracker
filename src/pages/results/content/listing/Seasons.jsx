import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import Error from "../../../error/Error"

// context
import { useResultsListingContext } from "./context/hooks/useResultsListingContext"

// model
import ResultListModel from '../../../../model/result/ResultList'

const Seasons = () => {
  const params = useParams()
  const { seasons, loading, error, dispatch } = useResultsListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_SEASONS_START' })
    ResultListModel.fetchWeekends(`/${params.year}/results`)
      .then(data => dispatch({ type: 'FETCH_SEASONS_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SEASONS_ERROR', payload: err }))
  }, [params.year, dispatch])

  return (
    <div className="results-listing__seasons">
      {loading && 'loading'}
      {error && <Error error={error} />}

      {seasons && seasons.weekends.map(weekend => (
        <div key={weekend.round}>
          <span>Round: {weekend.round} - </span>
          <span>Weekend: {weekend.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Seasons