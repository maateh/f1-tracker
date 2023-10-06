// components
import Error from '../Error'

// constants
import { ERROR_THEME_RED, ERROR_SIZE_LARGE } from '../constants/ErrorConstants'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'

// styles
import '../Error.css'

const ComponentErrorFallback = ({ resetErrorBoundary }) => {
  return (
		<Error
			headerIcon={<ErrorIcon />}
			info="An error occured."
			messages={[
        "Unfortunately, a component in the application was crashed unexpectedly.",
        <>
          Please try refresh the page, or go back to the <a href="/">Homepage</a>.
        </>
      ]}
			onReset={resetErrorBoundary}
			resetLabel="Refresh page"
			resetIcon={<RefreshIcon />}
			size={ERROR_SIZE_LARGE}
			color={ERROR_THEME_RED}
		/>
  )
}

export default ComponentErrorFallback
