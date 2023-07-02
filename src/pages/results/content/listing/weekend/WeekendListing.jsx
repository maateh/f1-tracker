import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// components
import ListingInfo from "../info/ListingInfo"
import ListingTable from "./table/ListingTable"
import Error from "../../../../error/Error"

// context
import { useResultsListingContext } from "../context/hooks/useResultsListingContext"

// model
import ResultModel from "../../../../../model/season/weekend/result/Result"
import WeekendInfoModel from "../../../../../model/season/weekend/result/info/WeekendInfo"

// icon
import { CircularProgress } from "@mui/material"

// styles
import '../ListingStyles.css'

const WeekendListing = () => {
  const params = useParams()
  const { weekend, loading, error, dispatch } = useResultsListingContext()
  const [weekendInfo, setWeekendInfo] = useState(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_WEEKEND_START' })
    ResultModel.fetchResult(params.year, params.weekend)
      .then(data => dispatch({ type: 'FETCH_WEEKEND_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_WEEKEND_ERROR', payload: err }))
  }, [params.year, params.weekend, dispatch])

  useEffect(() => {
    const info = new WeekendInfoModel(weekend)
    setWeekendInfo(info)
  }, [weekend])

  return (
    <div className="weekend listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {weekend && weekendInfo && (
        <>
          <ListingInfo info={weekendInfo} />
          <ListingTable />
        </>
      )}
    </div>
  )
}

export default WeekendListing