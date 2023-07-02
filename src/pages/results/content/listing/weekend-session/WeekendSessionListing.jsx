// components
import ListingTable from "./table/ListingTable"
import ListingInfo from "../info/ListingInfo"

// styles
import '../ListingStyles.css'

const WeekendSessionListing = () => {
  // TODO
  // loading here

  return (
    <div className="weekend-session listing__container">
      {/* TODO: check error & loading */}

      {/* <ListingInfo info={weekendSessionInfo} /> */}
      <ListingTable />
    </div>
  )
}

export default WeekendSessionListing