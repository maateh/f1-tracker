import Skeleton from "./Skeleton"

const SkeletonCard = () => {
  return (
    <div className="skeleton-card__wrapper">
      <div className="skeleton-element">
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="title" />
      </div>
    </div>
  )
}

export default SkeletonCard