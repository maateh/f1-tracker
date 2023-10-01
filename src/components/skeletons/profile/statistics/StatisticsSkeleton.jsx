// styles
import './StatisticsSkeleton.css'
import '../../Skeleton.css'

const StatisticsSkeleton = ({ titleFallback }) => {
  return (
    <div className="stats-skeleton__container">
      <h3 className="stats-skeleton__title-fallback skeleton-pulse">{titleFallback}</h3>
      <div className="stats-data-skeleton__container">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div key={index} className="stat-skeleton skeleton"></div>
          ))
        }
      </div>
    </div>
  )
}

export default StatisticsSkeleton
