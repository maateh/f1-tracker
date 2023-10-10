import { NavLink, useNavigate } from 'react-router-dom'

// components
import Error from '../Error'

// constants
import { ERROR_SIZE_LARGE, ERROR_THEME_ERROR, ERROR_THEME_WARNING } from '../constants/ErrorConstants'

// models
import DataNotFoundError from '../../../model/error/DataNotFoundError'

// icons
import FolderOffIcon from '@mui/icons-material/FolderOff'
import ErrorIcon from '@mui/icons-material/Error'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import RefreshIcon from '@mui/icons-material/Refresh'

// styles
import '../Error.css'

const ProfileErrorFallback = ({ error, resetErrorBoundary }) => {
	const navigate = useNavigate()

	return error instanceof DataNotFoundError ? (
		<Error
			headerIcon={<FolderOffIcon />}
			info="Data not found!"
			messages={[
				"Sorry, couldn't find any data with the requested ID.",
				<>
					Go back to the <NavLink to="/">Homepage</NavLink>
				</>
			]}
			onReset={() => navigate(-1)}
			resetLabel="Previous page"
			resetIcon={<SkipPreviousIcon />}
			size={ERROR_SIZE_LARGE}
			color={ERROR_THEME_WARNING}
		/>
	) : (
		<Error
			headerIcon={<ErrorIcon />}
			info="An error occurred!"
			messages={[
        "Sorry, an unexpected error occurred while loading the profile page.",
				<>
					Please try to reload the page, or go back to the <NavLink to="/">Homepage</NavLink>
				</>
			]}
			onReset={resetErrorBoundary}
			resetLabel="Try again"
			resetIcon={<RefreshIcon />}
			size={ERROR_SIZE_LARGE}
			color={ERROR_THEME_ERROR}
		/>
	)
}

export default ProfileErrorFallback
