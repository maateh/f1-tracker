import { useQuery } from "react-query"
import { useLoaderData } from "react-router-dom"

// components
import ListingInfo from "./info/ListingInfo"
import ListingTable from "./table/ListingTable"
import Pagination from "../pagination/Pagination"
import Error from "../error/Error"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const Listing = () => {
  const { queryKey, queryFn } = useLoaderData()

  const { isLoading, isError, error, data } = useQuery({
    queryKey, 
    queryFn
  })

  return (
    <div className="listing__container">
      {isLoading && <CircularProgress />}
      {isError && <Error error={error} />}

      {!isLoading && !isError && data && (
        <>
          <ListingInfo title={data.title} info={data.info} />
          <ListingTable header={data.header} table={data.table} />

          {data.pagination && <Pagination max={data.pagination.max} />}
        </>
      )}
    </div>
  )
}

export default Listing