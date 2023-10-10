import { NavLink } from 'react-router-dom'

// components
import Error from '../Error'

// constants
import { ERROR_SIZE_LARGE } from '../constants/ErrorConstants'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'

// styles
import '../Error.css'

const ProfileErrorFallback = ({ resetErrorBoundary }) => {
	return (
		<Error
			headerIcon={<ErrorIcon />}
			info="An error occurred."
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
		/>
	)
}

export default ProfileErrorFallback
