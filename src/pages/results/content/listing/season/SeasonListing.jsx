import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import ListingInfo from '../info/ListingInfo'
import ListingTable from './table/ListingTable'
import Error from "../../../../error/Error"

// context
import { useResultsListingContext } from "../context/hooks/useResultsListingContext"

// model
import ResultListModel from '../../../../../model/season/weekend/result/ResultList'
import SeasonInfoModel from '../../../../../model/season/weekend/result/info/SeasonInfo'

// icons
import { CircularProgress } from '@mui/material'

// styles
import '../ListingStyles.css'

const SeasonListing = () => {
  const params = useParams()
  const { season, loading, error, dispatch } = useResultsListingContext()
  const [seasonInfo, setSeasonInfo] = useState(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_SEASON_START' })
    ResultListModel.fetchResults(params.year)
      .then(data => dispatch({ type: 'FETCH_SEASON_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_SEASON_ERROR', payload: err }))
  }, [params.year, dispatch])

  useEffect(() => {
    if (!season) return
    const info = new SeasonInfoModel(season)
    setSeasonInfo(info)
  }, [season])

  return (
    <div className="season listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {season && seasonInfo && (
        <>
          <ListingInfo info={seasonInfo} />
          <ListingTable />
        </>
      )}
    </div>
  )
}

export default SeasonListing