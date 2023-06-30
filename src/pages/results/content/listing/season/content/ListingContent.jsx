// components
import AdditionalInfo from "./additional-info/AdditionalInfo"
import ListingTable from "./table/ListingTable"

// context
import { useResultsListingContext } from "../../context/hooks/useResultsListingContext"

const ListingContent = () => {
  const { season } = useResultsListingContext()
  
  return (
    <div className="season listing-content">
      <h2 className="page__subtitle">{season.year}</h2>

      <AdditionalInfo />
      <ListingTable />
    </div>
  )
}

export default ListingContent