// styles
import './FilterSkeleton.css'
import '../Skeleton.css'

const FilterSkeleton = ({ counter }) => {
  return (
    <ul className="filter-skeleton__container">
			{Array(counter)
				.fill()
				.map((_, index) => (
					<li className="filter-skeleton__wrapper" key={index}>
            <div className="filter-skeleton__title skeleton" />
            <div className="filter-skeleton__selector skeleton" />
          </li>
				))}
    </ul>
  )
}

export default FilterSkeleton
