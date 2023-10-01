// components
import TitleSkeleton from './title/TitleSkeleton'
import CardsSkeleton from './cards/CardsSkeleton'
import TableSkeleton from './table/TableSkeleton'

// styles
import './ListingSkeleton.css'
import '../Skeleton.css'

const ListingSkeleton = ({
	titleRequired,
  titleFallback,
	cardsCounter,
  tableRequired
}) => {
	return (
    <div className="listing-skeleton__container">
      {(titleRequired || titleFallback) && <TitleSkeleton titleFallback={titleFallback} />}

      {cardsCounter && <CardsSkeleton counter={cardsCounter} />}
      
      {tableRequired && <TableSkeleton />}
    </div>
  )
}

export default ListingSkeleton
