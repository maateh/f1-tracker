// context
import { useResultsListingContext } from "../context/hooks/useResultsListingContext"

const ListingContent = () => {
  const { seasons: { weekends } } = useResultsListingContext()
  
  return (
    <div className="seasons-listing-content">
      <h2>Seasons ListingContent</h2>

      <div className="note">
        <h3>NOTE</h3>

        <p>season year</p>

        <div>
          <p><strong>rounds TABLE (weekends)</strong></p>
          <div>
            <p>- #round</p>
            <p>- weekend name</p>
            <p>- circuit name</p>
            <p>- winning driver</p>
            <p>- winning constructor</p>
            <p>- fastest lap (+ driver code)</p>
            <p>- pole lap (+ driver code)</p>
            <p>- amount of laps</p>
            <p>- race duration</p>
          </div>
        </div>

        <div>
          <h4>more info... (link to history)</h4>
          <p>amount of drivers</p>
          <p>drivers TABLE</p>

          <p>amount of constructors</p>
          <p>constructors TABLE</p>
        </div>
      </div>

      {weekends.map(weekend => (
        <div key={weekend.round}>
          <span>Round: {weekend.round} - </span>
          <span>Weekend: {weekend.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ListingContent