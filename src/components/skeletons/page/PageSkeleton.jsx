// components
import LoadingSkeleton from '../loading/LoadingSkeleton'

// styles
import './PageSkeleton.css'
import '../Skeleton.css'

const PageSkeleton = () => {
  return (
    <div className="page-skeleton__container">
      <div className="page-skeleton__title skeleton"></div>
      <LoadingSkeleton linear={true} />
    </div>
  )
}

export default PageSkeleton
