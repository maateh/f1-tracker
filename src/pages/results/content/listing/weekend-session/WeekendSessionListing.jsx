// components
import ListingContent from "./content/ListingContent"

// styles
import '../ListingStyles.css'

const WeekendSessionListing = () => {
  // TODO
  // loading here

  return (
    <div className="weekend-session listing__container">
      {/* TODO: check error & loading */}

      <ListingContent />
    </div>
  )
}

export default WeekendSessionListing