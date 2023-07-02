import { useEffect } from "react"
import { useParams } from "react-router-dom"

// components
import ListingInfo from "../info/ListingInfo"
import ListingTable from "./table/ListingTable"
import Error from "../../../../error/Error"

// context
import { useWeekendListingContext } from "./context/hooks/useWeekendListingContext"

// model
import ResultModel from "../../../../../model/season/weekend/result/Result"

// icon
import { CircularProgress } from "@mui/material"

// styles
import '../ListingStyles.css'

const WeekendListing = () => {
  const params = useParams()
  const { data, info, loading, error, dispatch } = useWeekendListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    ResultModel.fetchResult(params.year, params.weekend)
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err }))
  }, [params.year, params.weekend, dispatch])

  return (
    <div className="weekend listing__container">
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

export default WeekendListing