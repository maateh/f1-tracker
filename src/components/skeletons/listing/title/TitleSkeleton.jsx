// styles
import './TitleSkeleton.css'
import '../../Skeleton.css'

const TitleSkeleton = ({ titleFallback }) => {
  return titleFallback ? (
    <h2 className="title-skeleton__fallback skeleton-pulse">{titleFallback}</h2>
  ) :  (
    <div className="title-skeleton skeleton"></div>
  )
}

export default TitleSkeleton
