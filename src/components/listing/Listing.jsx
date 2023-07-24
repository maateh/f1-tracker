import { useQuery } from "react-query"
import { useLoaderData } from "react-router-dom"

// components
import ListingInfo from "./info/ListingInfo"
import ListingTable from "./table/ListingTable"
import Error from "../error/Error"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const Listing = () => {
  const { queryKey, queryFn } = useLoaderData()

  const { isLoading, isError, error, data } = useQuery({
    queryKey: queryKey, 
    queryFn: queryFn
  })

  return (
    <div className="results-listing__container">
      {isLoading && <CircularProgress />}
      {isError && <Error error={error} />}

      {!isLoading && !isError && data && (
        <>
          <ListingInfo title={data.title} info={data.info} />
          <ListingTable header={data.header} table={data.table} />
        </>
      )}
    </div>
  )
}

export default Listing