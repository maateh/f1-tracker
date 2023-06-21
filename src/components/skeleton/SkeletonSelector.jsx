// skeleton loading component
import Skeleton from "./Skeleton"

const SkeletonSelector = () => {
  return (
    <div className="skeleton-selector__wrapper">
      <Skeleton type="text" />
      <Skeleton type="title" />
    </div>
  )
}

export default SkeletonSelector