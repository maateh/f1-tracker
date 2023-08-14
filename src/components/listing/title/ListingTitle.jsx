// styles
import './ListingTitle.css'

const ListingTitle = ({ title: { layout, main, sub } }) => {
	return layout || (
		<div className="listing-title__container">
			{main && <h2 className="listing-title-main">{main}</h2>}
			{sub && <h3 className="listing-title-sub">{sub}</h3>}
		</div>
	)
}

export default ListingTitle
