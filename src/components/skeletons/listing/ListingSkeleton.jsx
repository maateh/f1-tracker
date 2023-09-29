// components
import TitleSkeleton from './title/TitleSkeleton'
import CardsSkeleton from './cards/CardsSkeleton'

// styles
import './ListingSkeleton.css'
import '../Skeleton.css'
import TableSkeleton from './table/TableSkeleton'

const ListingSkeleton = ({
	titleRequired,
	cardsCounter,
  tableColumnsCounter,
	tableRowsCounter
}) => {
	return (
    <div className="listing-skeleton__container">
      {titleRequired && <TitleSkeleton />}

      {cardsCounter && <CardsSkeleton counter={cardsCounter} />}
      
      {tableColumnsCounter && tableRowsCounter && (
        <TableSkeleton
          columnsCounter={tableColumnsCounter}
          rowsCounter={tableRowsCounter}
        />
      )}
    </div>
  )
}

export default ListingSkeleton
