// components
import Error from '../Error'

// constants
import { ERROR_THEME_ERROR, ERROR_SIZE_MEDIUM } from '../constants/ErrorConstants'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'

// styles
import '../Error.css'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
		<Error
			headerIcon={<ErrorIcon />}
			info="An error occured."
			messages={[error.fallbackMsg]}
			onReset={resetErrorBoundary}
			resetLabel="Try again"
			resetIcon={<RefreshIcon />}
			size={ERROR_SIZE_MEDIUM}
			color={ERROR_THEME_ERROR}
		/>
  )
}

export default ErrorFallback
