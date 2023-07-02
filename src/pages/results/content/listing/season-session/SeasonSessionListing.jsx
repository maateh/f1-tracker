import { useEffect } from "react"
import { useParams } from "react-router-dom"

// components
// import ListingTable from "./table/ListingTable"
import ListingInfo from "../info/ListingInfo"
import Error from "../../../../error/Error"

// context
import { useSeasonSessionListingContext } from "./context/hooks/useSeasonSessionListing"

// icon
import { CircularProgress } from "@mui/material"

const SeasonSessionListing = () => {
  const params = useParams()
  const { data, info, loading, error, dispatch } = useSeasonSessionListingContext()

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    // ResultModel.fetchResult(params.year, params.weekend)
    //   .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
    //   .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err }))
  }, [params.year, params.weekend, dispatch])

  return (
    <div className="weekend-session listing__container">
      {loading && <CircularProgress />}
      {error && <Error error={error} />}

      {data && info && (
        <>
          <ListingInfo info={info} />
          {/* <ListingTable /> */}
        </>
      )}
    </div>
  )
}

export default SeasonSessionListing