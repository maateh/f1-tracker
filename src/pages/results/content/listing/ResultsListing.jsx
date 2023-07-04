import { useLoaderData } from "react-router-dom"

// components
import ListingInfo from "./info/ListingInfo"
import ListingTable from "./table/ListingTable"

const ResultsListing = () => {
  const data = useLoaderData()

  if (!data) return <p>WIP</p>

  return (
    <div className="results-listing__container">
      <ListingInfo info={data.info} />
      <ListingTable header={data.header} table={data.table} />
    </div>
  )
}

export default ResultsListing