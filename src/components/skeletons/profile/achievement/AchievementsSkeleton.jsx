// styles
import './AchievementsSkeleton.css'
import '../../Skeleton.css'

const AchievementsSkeleton = ({ titleFallback }) => {
  return (
    <div className="achievements-holder-skeleton__container">
      <h2 className="achievements-skeleton__title-fallback skeleton-pulse">{titleFallback}</h2>

      <div className="achievements-skeleton__container">
        {Array(5)
          .fill()
          .map((_, rowIndex) => (
            <div key={rowIndex} className="achievement-skeleton skeleton"></div>
          ))
        }
      </div>
    </div>
  )
}

export default AchievementsSkeleton
