// components
import InfoCard from "./card/InfoCard"

// styles
import './ListingInfo.css'

const ListingInfo = ({ title, info }) => {
  return (
    <div className="listing-info__container">
      <h2>{title}</h2>

      <div className="listing-category__container">
        {info?.map(info => <InfoCard info={info} key={info.category} />)}
      </div>
    </div>
  )
}

export default ListingInfo