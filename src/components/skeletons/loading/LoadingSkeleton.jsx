// icons
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

// styles
import './LoadingSkeleton.css'
import '../Skeleton.css'

const LoadingSkeleton = ({ circular, linear, height, width }) => {
  return (
    <div className="loading-skeleton__container">
      {linear && (
        <LinearProgress
          className="loading-skeleton__linear-progress-bar skeleton"
          style={{ height, width }}
        />
      )}

      {circular && (
        <CircularProgress
          className="loading-skeleton__circular-progress-bar skeleton"
          size={height}
        />
      )}
    </div>
  )
}

export default LoadingSkeleton
