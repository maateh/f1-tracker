// components
import AdditionalInformation from "./additional-info/AdditionalInformation"
import ListingTable from "./table/ListingTable"

// context
import { useResultsListingContext } from "../../context/hooks/useResultsListingContext"

const ListingContent = () => {
  const { season } = useResultsListingContext()
  
  return (
    <div className="seasons-listing-content">
      <h2 className="page__subtitle">{season.year}</h2>

      <AdditionalInformation />      
      <ListingTable />
    </div>
  )
}

export default ListingContent