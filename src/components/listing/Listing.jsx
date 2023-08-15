import { useLoaderData } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import ListingTitle from './title/ListingTitle'
import ListingCards from './cards/ListingCards'
import ListingTable from './table/ListingTable'
import Pagination from './pagination/Pagination'
import Error from '../error/Error'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const Listing = () => {
	const query = useLoaderData()
	const { isLoading, isError, error, data: listing } = useQuery(query)

	return (
		<div className="listing__container">
			{isLoading && <CircularProgress />}
			{isError && <Error error={error} />}

			{!isLoading && !isError && listing && (
				<>
					{listing.title && <ListingTitle title={listing.title} />}
					{listing.cards && <ListingCards cards={listing.cards} />}
					{listing.table && <ListingTable table={listing.table} />}
					{listing.pagination && <Pagination pagination={listing.pagination} />}
				</>
			)}
		</div>
	)
}

export default Listing
