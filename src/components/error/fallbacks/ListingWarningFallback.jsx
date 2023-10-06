// components
import Error from '../Error'

// constants
import { ERROR_THEME_WARNING, ERROR_SIZE_MEDIUM } from '../constants/ErrorConstants'

// icons
import InfoIcon from '@mui/icons-material/Info'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'

// styles
import '../Error.css'

const ListingWarningFallback = ({ error, resetErrorBoundary }) => {
  return (
		<Error
			headerIcon={<InfoIcon />}
			oops={false}
			info="No data for this period!"
			messages={[error.fallbackMsg]}
			onReset={resetErrorBoundary}
			resetLabel="Filter reset"
			resetIcon={<FilterListOffIcon />}
			size={ERROR_SIZE_MEDIUM}
			color={ERROR_THEME_WARNING}
		/>
  )
}

export default ListingWarningFallback
