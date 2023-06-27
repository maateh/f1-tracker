import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import ListingContent from './ListingContent'
import Error from "../../../../error/Error"

// context
import { useResultsListingContext } from "../context/hooks/useResultsListingContext"

// model
import ResultListModel from '../../../../../model/result/ResultList'

// icons
import { CircularProgress } from '@mui/material'

// styles
import './Seasons.css'

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
    <div className="seasons-listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {seasons && <ListingContent />}
    </div>
  )
}

export default Seasons