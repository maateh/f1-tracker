import SkeletonCard from "./SkeletonCard"

const SkeletonGrid = ({ counter }) => {
  return (
    <div className="skeleton-grid__wrapper">
      {Array(counter).fill(<SkeletonCard key={counter} />)}
    </div>
  )
}

export default SkeletonGrid