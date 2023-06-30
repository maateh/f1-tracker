import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import ListingContent from './content/ListingContent'
import Error from "../../../../error/Error"

// context
import { useResultsListingContext } from "../context/hooks/useResultsListingContext"

// model
import ResultListModel from '../../../../../model/result/ResultList'

// icons
import { CircularProgress } from '@mui/material'

// styles
import '../ListingStyles.css'

const SeasonListing = () => {
  const params = useParams()
  const { season, loading, error, dispatch } = useResultsListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_SEASON_START' })
    ResultListModel.fetchWeekends(`/${params.year}/results`)
      .then(data => dispatch({ type: 'FETCH_SEASON_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SEASON_ERROR', payload: err }))
  }, [params.year, dispatch])

  return (
    <div className="season listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {season && <ListingContent />}
    </div>
  )
}

export default SeasonListing