// components
import TitleSkeleton from './title/TitleSkeleton'
import CardsSkeleton from './cards/CardsSkeleton'
import TableSkeleton from './table/TableSkeleton'

// styles
import './ListingSkeleton.css'
import '../Skeleton.css'

const ListingSkeleton = ({
	titleRequired,
	cardsCounter,
  tableRequired
}) => {
	return (
    <div className="listing-skeleton__container">
      {titleRequired && <TitleSkeleton />}

      {cardsCounter && <CardsSkeleton counter={cardsCounter} />}
      
      {tableRequired && <TableSkeleton />}
    </div>
  )
}

export default ListingSkeleton
