import SkeletonCard from './SkeletonCard'

const SkeletonGrid = ({ counter }) => {
	return (
		<div className="skeleton-grid__wrapper">
			{Array(counter)
				.fill()
				.map((_, index) => (
					<SkeletonCard key={index} />
				))}
		</div>
	)
}

export default SkeletonGrid
