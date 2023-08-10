import { useQuery } from "react-query"
import { useLoaderData } from "react-router-dom"

// components
// import ListingInfo from "./info/ListingInfo"
// import ListingTable from "./table/ListingTable"
// import Pagination from "../pagination/Pagination"
import ListingTitle from "./title/ListingTitle"
import ListingTable from "./table/ListingTable"
import Error from "../error/Error"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const Listing = () => {
  const query = useLoaderData()

  const { 
    isLoading, 
    isError, 
    error, 
    data: listing 
  } = useQuery(query)

  return (
    <div className="listing__container">
      {isLoading && <CircularProgress />}
      {isError && <Error error={error} />}

      {!isLoading && !isError && listing && (
        <>
          {listing.title && <ListingTitle title={listing.title} />}
          {listing.table && <ListingTable table={listing.table} />}

          {/* {listing.pagination && <Pagination max={listing.pagination} />} */}
        </>
      )}
    </div>
  )
}

export default Listing
