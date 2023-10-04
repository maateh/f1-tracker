// components
import Error from '../Error'

// constants
import { ERROR_SIZE_LARGE } from '../constants/ErrorConstants'

// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

// styles
import '../Error.css'

const ApplicationErrorFallback = ({ resetErrorBoundary }) => {
  return (
		<Error
			info="An error occured."
			messages={[
        "Unfortunately, the application has crashed because something unexpected happened.",
        "Please try refresh the page, or come back later."
      ]}
			onReset={resetErrorBoundary}
			resetLabel="Refresh page"
			resetIcon={<SkipPreviousIcon />}
			size={ERROR_SIZE_LARGE}
		/>
  )
}

export default ApplicationErrorFallback
