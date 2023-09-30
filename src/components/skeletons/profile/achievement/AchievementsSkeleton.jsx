// styles
import './AchievementsSkeleton.css'
import '../../Skeleton.css'

const AchievementsSkeleton = () => {
  return (
    <div className="achievements-skeleton__container">
      <div className="achievements-skeleton__title skeleton"></div>
      {Array(5)
        .fill()
        .map((_, rowIndex) => (
          <div key={rowIndex} className="achievements-skeleton-row__container">
            {Array(4)
              .fill()
              .map((_, colIndex) => (
                <div key={colIndex} className="achievements-skeleton-data skeleton"></div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default AchievementsSkeleton
