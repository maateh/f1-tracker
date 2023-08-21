// skeleton loading component
import Skeleton from "./Skeleton"

const SkeletonSelector = ({ counter }) => {
  return (
    <div className="skeleton-selector__container">
			{Array(counter)
				.fill()
				.map((_, index) => (
					<div className="skeleton-selector__wrapper" key={index}>
            <Skeleton type="title" />
            <Skeleton type="text" />
          </div>
				))}
    </div>
  )
}

export default SkeletonSelector
