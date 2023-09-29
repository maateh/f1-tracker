// styles
import './CardsSkeleton.css'
import '../../Skeleton.css'

const CardsSkeleton = ({ counter }) => {
  return (
    <ul className={`cards-skeleton__container ${counter > 3 ? 'grid' : 'flex'}`}>
      {Array(counter)
				.fill()
				.map((_, index) => (
					<li
            className="card-skeleton skeleton"
            key={index}
          ></li>
				))}
    </ul>
  )
}

export default CardsSkeleton
