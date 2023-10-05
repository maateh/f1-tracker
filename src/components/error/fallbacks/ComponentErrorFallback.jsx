// components
import Error from '../Error'

// constants
import { ERROR_SIZE_LARGE } from '../constants/ErrorConstants'

// icons
import RefreshIcon from '@mui/icons-material/Refresh'

// styles
import '../Error.css'

const ComponentErrorFallback = ({ resetErrorBoundary }) => {
  return (
		<Error
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
		/>
  )
}

export default ComponentErrorFallback
