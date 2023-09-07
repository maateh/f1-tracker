// components
import Error from '../error/Error'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const LoadingHandler = ({ isLoading, isError, error }) => {
  return (isLoading || isError) && (
    <div className="loading-handler">
      {isLoading && <CircularProgress />}
			{isError && <Error error={error} />}
    </div>
  )
}

export default LoadingHandler
