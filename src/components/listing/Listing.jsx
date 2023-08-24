// components
import ListingTitle from './title/ListingTitle'
import ListingCards from './cards/ListingCards'
import ListingTable from './table/ListingTable'
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
					{listing.pages && <Pagination pages={listing.pages} />}
				</>
			)}
		</div>
	)
}

export default Listing
