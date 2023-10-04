import { NavLink, useNavigate } from 'react-router-dom'

// icons
import ErrorIcon from '@mui/icons-material/Error'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

// styles
import './Error.css'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className="error-fallback large">
			<ErrorIcon className="error__icon" />
			<p className="error-title">Ooops!</p>
			<p className="error-info">Page not found!</p>

			<p className="error-msg">
				Go back to the <NavLink to="/">Homepage</NavLink>
			</p>

			<button className="btn icon__container" onClick={() => navigate(-1)}>
				<SkipPreviousIcon />
				<span>Previous page</span>
			</button>
		</div>
	)
}

export default NotFound
