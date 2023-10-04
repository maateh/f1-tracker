import { NavLink, useNavigate } from 'react-router-dom'

// components
import Error from './Error'

// constants
import { ERROR_SIZE_LARGE } from './constants/ErrorConstants'

// styles
import './Error.css'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Error
			info="Page not found!"
			messages={[
				<>
					Go back to the <NavLink to="/">Homepage</NavLink>
				</>
			]}
			onReset={() => navigate(-1)}
			resetLabel="Previous page"
			size={ERROR_SIZE_LARGE}
		/>
	)
}

export default NotFound
