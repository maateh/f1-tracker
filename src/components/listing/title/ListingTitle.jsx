// styles
import './Title.css'

const ListingTitle = ({ title: { main, sub } }) => {
	return (
		<div className="title__container">
			{main && <h2 className="title-main">{main}</h2>}
			{sub && <h3 className="title-sub">{sub}</h3>}
		</div>
	)
}

export default ListingTitle
