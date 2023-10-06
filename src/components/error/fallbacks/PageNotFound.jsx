import { NavLink, useNavigate } from 'react-router-dom'

// components
import Error from '../Error'

// constants
import { ERROR_SIZE_LARGE } from '../constants/ErrorConstants'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

// styles
import '../Error.css'

const PageNotFound = () => {
	const navigate = useNavigate()

	return (
		<Error
			headerIcon={<ErrorIcon />}
			info="Page not found!"
			messages={[
				<>
					Go back to the <NavLink to="/">Homepage</NavLink>
				</>
			]}
			onReset={() => navigate(-1)}
			resetLabel="Previous page"
			resetIcon={<SkipPreviousIcon />}
			size={ERROR_SIZE_LARGE}
		/>
	)
}

export default PageNotFound
