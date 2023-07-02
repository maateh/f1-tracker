// components
import InfoCard from "./card/InfoCard"

const ListingInfo = ({ info }) => {
  return (
    <div className="listing-info__container">
      <h2>Additional information</h2>

      <div className="listing-category__container">
        {info.map(info => <InfoCard info={info} key={info.category} />)}
      </div>
    </div>
  )
}

export default ListingInfo