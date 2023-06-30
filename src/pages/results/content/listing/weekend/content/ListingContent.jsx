// components
import AdditionalInfo from "./additional-info/AdditionalInfo"
import ListingTable from "./table/ListingTable"

const ListingContent = () => {
  return (
    <div className="weekend listing-content">
      <h2>Weekend ListingContent</h2>

      <AdditionalInfo />
      <ListingTable />
    </div>
  )
}
export default ListingContent