// styles
import './ListingTitle.css'

const ListingTitle = ({ title }) => {
	return (
		<div className="listing-title__container">
			{title.main && <h2 className="listing-title-main">{title.main}</h2>}
			{title.sub && <h3 className="listing-title-sub">{title.sub}</h3>}
		</div>
	)
}
export default ListingTitle
