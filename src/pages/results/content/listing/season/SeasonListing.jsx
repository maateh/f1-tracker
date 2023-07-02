import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import ListingInfo from '../info/ListingInfo'
import ListingTable from './table/ListingTable'
import Error from "../../../../error/Error"

// context
import { useSeasonListingContext } from './context/hooks/useSeasonListingContext'

// model
import ResultListModel from '../../../../../model/season/weekend/result/ResultList'

// icons
import { CircularProgress } from '@mui/material'

// styles
import '../ListingStyles.css'

const SeasonListing = () => {
  const params = useParams()
  const { data, info, loading, error, dispatch } = useSeasonListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    ResultListModel.fetchResults(params.year)
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err }))
  }, [params.year, dispatch])

  return (
    <div className="season listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {data && info && (
        <>
          <ListingInfo info={info} />
          <ListingTable />
        </>
      )}
    </div>
  )
}

export default SeasonListing