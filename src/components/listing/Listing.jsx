// components
import ListingTitle from './title/Title'
import ListingCards from './cards/Cards'
import ListingTable from './table/Table'
import Pagination from './pagination/Pagination'
import Error from '../error/Error'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const Listing = ({ listing, loading, isError, error }) => {
	return (
		<div className="listing__container">
			{loading && <CircularProgress />}
			{isError && <Error error={error} />}

			{!loading && !isError && listing && (
				<>
					{listing.title && <ListingTitle title={listing.title} />}
					{listing.cards && <ListingCards cards={listing.cards} />}
					{listing.table && <ListingTable table={listing.table} />}
					{listing.pageQuantity && <Pagination pages={listing.pageQuantity} />}
				</>
			)}
		</div>
	)
}

export default Listing
