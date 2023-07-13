import { Fragment } from "react"

// skeleton loading component
import Skeleton from "./Skeleton"

const SkeletonSelector = ({ counter }) => {
  return (
    <div className="skeleton-selector__wrapper">
			{Array(counter)
				.fill()
				.map((_, index) => (
					<Fragment key={index}>
            <Skeleton type="text" />
            <Skeleton type="text" />
          </Fragment>
				))}
    </div>
  )
}

export default SkeletonSelector