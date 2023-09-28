// icons
import CircularProgressIcon from '@mui/material/CircularProgress'

// styles
import './PageSkeleton.css'
import '../Skeleton.css'

const PageSkeleton = () => {
  return (
    <div className="page-skeleton__container">
      <div className="page-skeleton__title skeleton skeleton"></div>
      <CircularProgressIcon
        className="page-skeleton__icon"
        size={64}
      />
    </div>
  )
}

export default PageSkeleton
