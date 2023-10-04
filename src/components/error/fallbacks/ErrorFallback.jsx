// components
import Error from '../Error'

// constants
import { ERROR_SIZE_MEDIUM } from '../constants/ErrorConstants'

// icons
import RefreshIcon from '@mui/icons-material/Refresh';

// styles
import '../Error.css'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
		<Error
			info="An error occured."
			messages={[error.fallbackMsg]}
			onReset={resetErrorBoundary}
			resetLabel="Try again"
			resetIcon={<RefreshIcon />}
			size={ERROR_SIZE_MEDIUM}
		/>
  )
}

export default ErrorFallback
