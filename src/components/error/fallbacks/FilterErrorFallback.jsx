import { useNavigate } from 'react-router-dom'

// components
import Error from '../Error'

// constants
import { ERROR_SIZE_SMALL, ERROR_THEME_ERROR } from '../constants/ErrorConstants'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'

// styles
import '../Error.css'

const FilterErrorFallback = () => {
  const navigate = useNavigate()

  return (
		<Error
			headerIcon={<ErrorIcon />}
			oops={false}
			info="Invalid parameter in the filter!"
			messages={["An error occurred when loading the filter, might be an invalid parameter gotten. Please try reset the filter."]}
			onReset={() => navigate('./')}
			resetLabel="Filter reset"
			resetIcon={<FilterListOffIcon />}
			size={ERROR_SIZE_SMALL}
			color={ERROR_THEME_ERROR}
		/>
  )
}

export default FilterErrorFallback
